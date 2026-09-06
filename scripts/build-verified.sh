#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "${SITES_ENV_READY:-}" != "1" ]]; then
  exec "${script_dir}/sites-env.sh" -- "$0" "$@"
fi

vinext="${SITES_PROJECT_ROOT}/node_modules/.bin/vinext"
if [[ ! -x "${vinext}" ]]; then
  echo "vinext is unavailable. Run npm run install:ci and wait for it to finish before building." >&2
  exit 69
fi

echo "Running bounded vinext build..."
node --input-type=module - \
  "${vinext}" \
  "${SITES_BUILD_TIMEOUT:-3m}" \
  "${SITES_BUILD_KILL_AFTER:-10s}" <<'NODE'
import { spawn } from "node:child_process";

const [vinext, timeoutValue, killAfterValue] = process.argv.slice(2);
const units = {
  ms: 1,
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
};

function durationMs(value, name) {
  const match = /^(\d+(?:\.\d*)?|\.\d+)(ms|s|m|h|d)?$/i.exec(value);
  if (!match) {
    throw new Error(`${name} must be a non-negative duration such as 500ms, 10s, or 3m; got ${value}`);
  }

  const milliseconds = Number(match[1]) * units[(match[2] ?? "s").toLowerCase()];
  if (!Number.isFinite(milliseconds) || milliseconds > 2_147_483_647) {
    throw new Error(`${name} is outside the supported timer range: ${value}`);
  }
  return milliseconds;
}

let timeoutMs;
let killAfterMs;
try {
  timeoutMs = durationMs(timeoutValue, "SITES_BUILD_TIMEOUT");
  killAfterMs = durationMs(killAfterValue, "SITES_BUILD_KILL_AFTER");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(64);
}

const child = spawn(vinext, ["build"], {
  env: process.env,
  stdio: "inherit",
});
let timedOut = false;
let killTimer;

const timeoutTimer = timeoutMs === 0 ? undefined : setTimeout(() => {
  timedOut = true;
  console.error(`vinext build exceeded ${timeoutValue}; sending SIGTERM.`);
  child.kill("SIGTERM");
  if (killAfterMs > 0) {
    killTimer = setTimeout(() => {
      console.error(`vinext build did not exit within ${killAfterValue}; sending SIGKILL.`);
      child.kill("SIGKILL");
    }, killAfterMs);
  }
}, timeoutMs);

for (const signal of ["SIGHUP", "SIGINT", "SIGTERM"]) {
  process.once(signal, () => child.kill(signal));
}

const result = await new Promise((resolve) => {
  child.once("error", (error) => resolve({ error }));
  child.once("exit", (code, signal) => resolve({ code, signal }));
});

if (timeoutTimer) clearTimeout(timeoutTimer);
if (killTimer) clearTimeout(killTimer);

if (result.error) {
  console.error(`Could not start vinext build: ${result.error.message}`);
  process.exit(69);
}
if (timedOut) process.exit(124);
if (result.code !== null) process.exit(result.code);

const signalExitCodes = {
  SIGHUP: 129,
  SIGINT: 130,
  SIGKILL: 137,
  SIGTERM: 143,
};
process.exit(signalExitCodes[result.signal] ?? 1);
NODE

"${script_dir}/validate-artifact.sh"
