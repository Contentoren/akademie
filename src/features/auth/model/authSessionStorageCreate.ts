import { authSessionParse } from "./authSessionParse"
import type { AuthSession } from "./authSession"
import type { AuthResult } from "./authResult"

const SESSION_STORAGE_KEY = "userSession"

type AuthSessionStorage = Pick<Storage, "getItem" | "removeItem" | "setItem">

export function authSessionStorageCreate(storage: AuthSessionStorage) {
  function read(): AuthResult<AuthSession> {
    const serialized = storage.getItem(SESSION_STORAGE_KEY)
    if (!serialized) {
      return { success: false, op: "authSessionStorageRead", errorMessage: "No session is stored." }
    }

    try {
      return authSessionParse(JSON.parse(serialized) as unknown)
    } catch {
      return { success: false, op: "authSessionStorageRead", errorMessage: "The stored session is not valid JSON." }
    }
  }

  function write(session: AuthSession): void {
    storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  }

  function clear(): void {
    storage.removeItem(SESSION_STORAGE_KEY)
  }

  return { clear, read, write }
}
