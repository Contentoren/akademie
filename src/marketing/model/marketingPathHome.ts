import type { MarketingLanguage } from "./marketingLanguage.ts"

/** Public home path of a language. German is also reachable at the site root. */
export function marketingPathHome(language: MarketingLanguage): string {
  return language === "de" ? "/de" : "/en"
}
