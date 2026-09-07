export function authErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("Invalid credentials")) {
      return "E-Mail oder Passwort ist nicht korrekt."
    }

    return error.message
  }

  return "Anmeldung fehlgeschlagen. Bitte erneut versuchen."
}
