import type { LearningCourse } from "#src/features/learning/model/learningCourse"

/**
 * Demo-Platzhalterkatalog. Enthält bewusst keine echten Schulungsinhalte.
 * Die IDs sind stabil und werden für Routen und lokalen Fortschritt verwendet.
 */
export const learningCourses: LearningCourse[] = [
  {
    id: "ki-verstehen",
    title: "KI verstehen",
    tagline: "Was hinter den Werkzeugen steckt – ohne Fachjargon.",
    description:
      "Ein ruhiger Einstieg in Sprachmodelle: was sie können, wo sie an Grenzen stoßen und wie man ihre Antworten einordnet. Platzhalterkurs zur Gestaltung des Lernbereichs.",
    accent: "teal",
    level: "Einstieg",
    objectives: [
      "Grundbegriffe wie Modell, Prompt und Kontext sicher einordnen",
      "Typische Stärken und Schwächen von Sprachmodellen benennen",
      "Antworten kritisch prüfen statt blind übernehmen",
    ],
    modules: [
      {
        id: "grundlagen",
        title: "Grundlagen",
        summary: "Begriffe und Denkmodelle für den Rest des Kurses.",
        lessons: [
          {
            id: "was-ist-ki",
            title: "Was mit „KI“ gemeint ist",
            summary: "Eine kurze Einordnung der Begriffe, die im Alltag durcheinandergeraten.",
            minutes: 6,
            kind: "lesson",
          },
          {
            id: "wie-modelle-antworten",
            title: "Wie Modelle zu Antworten kommen",
            summary: "Wahrscheinlichkeiten statt Wissensdatenbank – und was daraus folgt.",
            minutes: 8,
            kind: "lesson",
          },
        ],
      },
      {
        id: "grenzen",
        title: "Grenzen und Verlässlichkeit",
        summary: "Wo Vorsicht angebracht ist und woran man das erkennt.",
        lessons: [
          {
            id: "halluzinationen",
            title: "Erfundene Antworten erkennen",
            summary: "Warum Modelle überzeugend danebenliegen können.",
            minutes: 7,
            kind: "lesson",
          },
          {
            id: "quellen-pruefen",
            title: "Übung: Eine Antwort gegenprüfen",
            summary: "Eine Beispielantwort Schritt für Schritt auf Belege abklopfen.",
            minutes: 10,
            kind: "exercise",
          },
          {
            id: "einordnung",
            title: "Rückblick: Mein Bild von KI",
            summary: "Kurze Notiz, was sich an der eigenen Einschätzung geändert hat.",
            minutes: 4,
            kind: "reflection",
          },
        ],
      },
    ],
  },
  {
    id: "besser-prompten",
    title: "Besser prompten",
    tagline: "Klare Anfragen, brauchbare Ergebnisse.",
    description:
      "Vom vagen Wunsch zur präzisen Anfrage: Struktur, Kontext und Nachschärfen. Platzhalterkurs zur Gestaltung des Lernbereichs.",
    accent: "lime",
    level: "Aufbau",
    objectives: [
      "Anfragen mit Rolle, Aufgabe und Kontext aufbauen",
      "Ergebnisse gezielt nachschärfen statt neu zu beginnen",
      "Wiederverwendbare Vorlagen für eigene Aufgaben anlegen",
    ],
    modules: [
      {
        id: "aufbau",
        title: "Aufbau einer guten Anfrage",
        summary: "Die wenigen Bausteine, die den größten Unterschied machen.",
        lessons: [
          {
            id: "kontext-geben",
            title: "Kontext, den das Modell nicht hat",
            summary: "Welche Informationen wirklich in die Anfrage gehören.",
            minutes: 7,
            kind: "lesson",
          },
          {
            id: "format-vorgeben",
            title: "Das Ergebnisformat vorgeben",
            summary: "Länge, Ton und Struktur vorab festlegen.",
            minutes: 6,
            kind: "lesson",
          },
          {
            id: "prompt-schreiben",
            title: "Übung: Einen Prompt umschreiben",
            summary: "Eine schwache Anfrage in drei Durchgängen verbessern.",
            minutes: 12,
            kind: "exercise",
          },
        ],
      },
      {
        id: "nachschaerfen",
        title: "Nachschärfen im Dialog",
        summary: "Wie aus einem mittelmäßigen ein passendes Ergebnis wird.",
        lessons: [
          {
            id: "gezielt-korrigieren",
            title: "Gezielt korrigieren statt neu starten",
            summary: "Präzise Folgeanweisungen formulieren.",
            minutes: 8,
            kind: "lesson",
          },
          {
            id: "eigene-vorlage",
            title: "Übung: Eigene Vorlage anlegen",
            summary: "Eine wiederkehrende Aufgabe als Vorlage festhalten.",
            minutes: 10,
            kind: "exercise",
          },
        ],
      },
    ],
  },
  {
    id: "ki-im-arbeitsalltag",
    title: "KI im Arbeitsalltag",
    tagline: "Sinnvoll einsetzen – und wissen, wann nicht.",
    description:
      "Konkrete Einsatzfelder, Umgang mit sensiblen Daten und eine ehrliche Aufwandsabwägung. Platzhalterkurs zur Gestaltung des Lernbereichs.",
    accent: "clay",
    level: "Praxis",
    objectives: [
      "Passende Aufgaben für KI-Unterstützung auswählen",
      "Sensible Daten im Arbeitsalltag schützen",
      "Ergebnisse verantwortlich prüfen und freigeben",
    ],
    modules: [
      {
        id: "einsatzfelder",
        title: "Einsatzfelder finden",
        summary: "Wo Unterstützung trägt und wo sie Mehrarbeit erzeugt.",
        lessons: [
          {
            id: "aufgaben-sortieren",
            title: "Aufgaben sortieren",
            summary: "Ein einfaches Raster für geeignete und ungeeignete Aufgaben.",
            minutes: 7,
            kind: "lesson",
          },
          {
            id: "eigene-woche",
            title: "Übung: Die eigene Woche durchgehen",
            summary: "Drei wiederkehrende Aufgaben auf Eignung prüfen.",
            minutes: 10,
            kind: "exercise",
          },
        ],
      },
      {
        id: "verantwortung",
        title: "Daten und Verantwortung",
        summary: "Sorgfalt im Umgang mit Informationen und Ergebnissen.",
        lessons: [
          {
            id: "sensible-daten",
            title: "Sensible Daten erkennen",
            summary: "Was nicht in ein externes Werkzeug gehört.",
            minutes: 8,
            kind: "lesson",
          },
          {
            id: "freigabe",
            title: "Ergebnisse prüfen und freigeben",
            summary: "Eine kurze Prüfroutine vor der Weitergabe.",
            minutes: 6,
            kind: "lesson",
          },
          {
            id: "eigene-regeln",
            title: "Rückblick: Meine Leitplanken",
            summary: "Drei persönliche Regeln für den Umgang mit KI notieren.",
            minutes: 5,
            kind: "reflection",
          },
        ],
      },
    ],
  },
]
