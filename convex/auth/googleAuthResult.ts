export type GoogleAuthResult<T> =
  | { success: true; data: T }
  | { success: false; op: string; errorMessage: string }
