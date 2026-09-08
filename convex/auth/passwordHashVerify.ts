export async function passwordHashVerify(password: string, encodedHash: string): Promise<boolean> {
  const parts = encodedHash.split("$")
  if (parts.length !== 4) {
    return false
  }

  const [algorithm, iterationsValue, saltValue, hashValue] = parts
  const iterations = Number(iterationsValue)

  if (algorithm !== "pbkdf2-sha256" || iterations !== 120_000 || !saltValue || !hashValue) {
    return false
  }

  const salt = base64UrlToBytes(saltValue)
  const expectedHash = base64UrlToBytes(hashValue)
  if (!salt || salt.length !== 16 || !expectedHash || expectedHash.length !== 32) {
    return false
  }

  try {
    const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"])
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        iterations,
        salt: Uint8Array.from(salt).buffer as ArrayBuffer,
      },
      key,
      expectedHash.length * 8,
    )

    return bytesEqual(new Uint8Array(derivedBits), expectedHash)
  } catch {
    return false
  }
}

function base64UrlToBytes(value: string): Uint8Array | null {
  if (!/^[A-Za-z0-9_-]+$/u.test(value) || value.length % 4 === 1) {
    return null
  }

  try {
    const normalized = value.replaceAll("-", "+").replaceAll("_", "/") + "=".repeat((4 - (value.length % 4)) % 4)
    const binary = atob(normalized)
    const bytes = new Uint8Array(binary.length)
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index)
    }
    if (bytesToBase64Url(bytes) !== value) {
      return null
    }

    return bytes
  } catch {
    return null
  }
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = ""
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")
}

function bytesEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) {
    return false
  }

  let difference = 0
  for (let index = 0; index < left.length; index += 1) {
    difference |= (left[index] ?? 0) ^ (right[index] ?? 0)
  }

  return difference === 0
}
