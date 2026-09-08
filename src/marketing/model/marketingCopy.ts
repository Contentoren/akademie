import type { MarketingLanguage } from "./marketingLanguage.ts"

type MarketingCopyTexts = {
  readonly brandTagline: string
  readonly signIn: string
  readonly navCourses: string
  readonly heroTitle: string
  readonly heroText: string
  readonly heroCourses: string
  readonly methodTitle: string
  readonly coursesTitle: string
  readonly coursesText: string
  readonly courseDetails: string
  readonly audience: string
  readonly modules: string
  readonly objectives: string
  readonly minutesShort: string
  readonly totalTime: string
  readonly version: string
  readonly backToCourses: string
  readonly accessTitle: string
  readonly accessText: string
  readonly notFound: string
  readonly footerNote: string
}

/** Public website wording. Descriptions come from the versioned course package, not from marketing claims. */
export const marketingCopy: Readonly<Record<MarketingLanguage, MarketingCopyTexts>> = {
  de: {
    brandTagline: "KI-Schulungen",
    signIn: "Anmelden",
    navCourses: "Kurse",
    heroTitle: "KI-Schulungen für Büro- und Wissensarbeit.",
    heroText:
      "Die Kurse der KI-Akademie trainieren einen wiederholbaren Arbeitsablauf: Aufgabe wählen, Kontext bereitstellen, Ergebnis prüfen, verantwortlich freigeben. Die Kursinhalte sind toolneutral und setzen kein externes Konto voraus.",
    heroCourses: "Kurse ansehen",
    methodTitle: "Der wiederkehrende Arbeitsablauf",
    coursesTitle: "Kurse",
    coursesText: "Aufbau, Zeitrahmen und Lernziele der Kurse im Überblick.",
    courseDetails: "Kursdetails",
    audience: "Zielgruppe",
    modules: "Module",
    objectives: "Lernziele",
    minutesShort: "Min.",
    totalTime: "Gesamtzeit",
    version: "Kursstand",
    backToCourses: "Zurück zu den Kursen",
    accessTitle: "Lernbereich",
    accessText:
      "Lektionen, Übungen und Fortschritt sind Teilnehmenden vorbehalten und nach der Anmeldung im Lernbereich verfügbar.",
    notFound: "Dieser Kurs ist nicht veröffentlicht.",
    footerNote: "Lektionstexte, Übungsdaten und Prüfungen sind nur im Lernbereich verfügbar.",
  },
  en: {
    brandTagline: "AI training",
    signIn: "Sign in",
    navCourses: "Courses",
    heroTitle: "AI training for office and knowledge work.",
    heroText:
      "The courses of KI-Akademie train a repeatable working procedure: choose the task, provide the context, check the result, approve responsibly. The course content is tool-neutral and requires no external account.",
    heroCourses: "View courses",
    methodTitle: "The recurring working procedure",
    coursesTitle: "Courses",
    coursesText: "Structure, guide times and learning objectives of the courses.",
    courseDetails: "Course details",
    audience: "Audience",
    modules: "Modules",
    objectives: "Learning objectives",
    minutesShort: "min",
    totalTime: "Total time",
    version: "Course version",
    backToCourses: "Back to the courses",
    accessTitle: "Learning area",
    accessText:
      "Lessons, exercises and progress are reserved for participants and available in the learning area after signing in.",
    notFound: "This course is not published.",
    footerNote: "Lesson texts, exercise data and assessments are only available in the learning area.",
  },
}
