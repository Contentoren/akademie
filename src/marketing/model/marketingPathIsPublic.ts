/** Public website paths render without authentication; every other path stays auth gated. */
export function marketingPathIsPublic(pathname: string): boolean {
  const path = pathname.replace(/\/+$/u, "")
  if (path.length === 0) return true
  return path === "/de" || path === "/en" || path.startsWith("/de/") || path.startsWith("/en/")
}
