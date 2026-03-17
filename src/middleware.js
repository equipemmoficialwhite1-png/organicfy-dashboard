export { auth as middleware } from "./auth"

export const config = {
  // Protect the dashboard and any subpaths
  matcher: ["/dashboard/:path*"],
}
