export type AuthOAuthVerifierStorage = {
  getItem: (key: string) => string | null
  removeItem: (key: string) => void
  setItem: (key: string, value: string) => void
}

export type AuthOAuthVerifierStore = {
  clear: () => void
  persist: (verifier: string | undefined) => void
  read: () => string | undefined
}

export function authOAuthVerifierStoreCreate(storageKey: string, storage: AuthOAuthVerifierStorage): AuthOAuthVerifierStore {
  function read() {
    return storage.getItem(storageKey) ?? undefined
  }

  function persist(verifier: string | undefined) {
    if (!verifier) {
      storage.removeItem(storageKey)
      return
    }

    storage.setItem(storageKey, verifier)
  }

  function clear() {
    storage.removeItem(storageKey)
  }

  return { clear, persist, read }
}
