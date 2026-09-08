const PASSWORD_HASH_ALGORITHM = "pbkdf2-sha256"
const PASSWORD_HASH_ITERATIONS = 120_000
const PASSWORD_HASH_BYTES = 32
const PASSWORD_SALT_BYTES = 16

export async function passwordHashCreate(password: string): Promise<string> {
  const salt = new Uint8Array(PASSWORD_SALT_BYTES)
  crypto.getRandomValues(salt)

  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"])
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations: PASSWORD_HASH_ITERATIONS,
      salt,
    },
    key,
    PASSWORD_HASH_BYTES * 8,
  )

  return [PASSWORD_HASH_ALGORITHM, String(PASSWORD_HASH_ITERATIONS), bytesToBase64Url(salt), bytesToBase64Url(new Uint8Array(derivedBits))].join("$")
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = ""
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")
}
