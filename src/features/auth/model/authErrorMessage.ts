export function authErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes("AUTH_INVALID_CREDENTIALS") || error.message.includes("Invalid credentials")) {
      return "E-Mail oder Passwort ist nicht korrekt."
    }

    if (error.message.includes("AUTH_EMAIL_EXISTS")) {
      return "Für diese E-Mail-Adresse existiert bereits ein Konto."
    }

    if (error.message.includes("AUTH_INVALID_INPUT")) {
      return "Bitte prüfe E-Mail-Adresse und Passwort."
    }

    if (error.message.includes("AUTH_INVALID_OAUTH_CODE") || error.message.includes("google_denied") || error.message.includes("google_failed")) {
      return "Die Google-Anmeldung konnte nicht abgeschlossen werden. Bitte erneut versuchen."
    }

    if (error.message.includes("AUTH_INVALID_SESSION")) {
      return "Die Anmeldung konnte nicht gespeichert werden. Bitte erneut versuchen."
    }

    return error.message
  }

  return "Anmeldung fehlgeschlagen. Bitte erneut versuchen."
}
