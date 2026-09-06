export function GET(request: Request) {
  return Response.redirect(new URL("/it", request.url), 308);
}
