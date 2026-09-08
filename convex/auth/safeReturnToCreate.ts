export function safeReturnToCreate(returnTo: string | null | undefined, appUrl: string): string | null {
  if (!URL.canParse(appUrl)) {
    return null
  }

  const baseUrl = new URL(appUrl)
  if ((baseUrl.protocol !== "http:" && baseUrl.protocol !== "https:") || baseUrl.username || baseUrl.password) {
    return null
  }
  const candidate = returnTo?.trim() || "/"
  if (/[\u0000-\u001f\u007f]/u.test(candidate) || candidate.includes("\\") || candidate.startsWith("//")) {
    return null
  }

  try {
    const targetUrl = new URL(candidate, baseUrl)
    if (targetUrl.origin !== baseUrl.origin) {
      return null
    }
    return targetUrl.toString()
  } catch {
    return null
  }
}
