import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server"
import { ConvexError } from "convex/values"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        const email = String(params.email ?? "")
          .trim()
          .toLowerCase()

        if (!email || !email.includes("@")) {
          throw new ConvexError("Bitte eine gültige E-Mail-Adresse verwenden.")
        }

        return { email }
      },
      validatePasswordRequirements(password) {
        if (password.length < 8) {
          throw new ConvexError("Das Passwort muss mindestens 8 Zeichen lang sein.")
        }
      },
    }),
  ],
})
