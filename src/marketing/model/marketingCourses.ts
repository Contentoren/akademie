import type { MarketingCourse } from "./marketingCourse.ts"

/**
 * Public course facts derived from the versioned course package in `content/ki-fuehrerschein`
 * (`kurs.json` manifest and `README.md`). Only titles, guide times and learning objectives are
 * published here; lesson texts, exercises and assessment material stay in the protected area.
 */
export const marketingCourses: readonly MarketingCourse[] = [
  {
    slug: "ki-fuehrerschein",
    version: "1.0.0-entwurf",
    totalMinutes: 390,
    title: {
      de: "KI-Führerschein für Büro- und Wissensarbeit",
      en: "AI driving licence for office and knowledge work",
    },
    tagline: {
      de: "Toolneutral, ohne externes Konto, mit synthetischen Übungsdaten.",
      en: "Tool-neutral, without an external account, using synthetic practice data.",
    },
    description: {
      de: "Ein eigenständiger, deutschsprachiger Onlinekurs für kleine und mittlere Unternehmen. Der Kurs ist asynchron bearbeitbar und trainiert einen wiederholbaren Arbeitsablauf statt der Bedienung eines bestimmten Produkts.",
      en: "A self-contained German-language online course for small and medium-sized companies. The course can be worked through asynchronously and trains a repeatable working procedure instead of operating one specific product.",
    },
    audience: {
      de: "Büro- und Wissensarbeit in kleinen und mittleren Unternehmen",
      en: "Office and knowledge work in small and medium-sized companies",
    },
    method: {
      de: ["Aufgabe wählen", "Kontext bereitstellen", "Ergebnis prüfen", "Verantwortlich freigeben"],
      en: ["Choose the task", "Provide the context", "Check the result", "Approve responsibly"],
    },
    modules: [
      {
        id: "m0",
        number: 0,
        minutes: 15,
        title: { de: "Startcheck", en: "Starting check" },
        objectives: {
          de: [
            "die eigene Arbeitssituation und ein sinnvolles Lernziel benennen",
            "Sicherheits- und Verantwortungsgrenzen vor der ersten Eingabe erkennen",
            "zwischen Teilnahme, Übungsergebnis und verantwortlicher Freigabe unterscheiden",
          ],
          en: [
            "name your own working situation and a meaningful learning goal",
            "recognise safety and responsibility limits before the first input",
            "distinguish participation, exercise result and responsible approval",
          ],
        },
      },
      {
        id: "m1",
        number: 1,
        minutes: 35,
        title: { de: "KI sinnvoll einsetzen", en: "Using AI sensibly" },
        objectives: {
          de: [
            "typische KI-Fähigkeiten und ihre Grenzen für Büroaufgaben einschätzen",
            "geeignete, ungeeignete und nur mit Prüfung bearbeitbare Aufgaben unterscheiden",
            "die Aufgabenampel für eine begründete Einsatzentscheidung nutzen",
          ],
          en: [
            "assess typical AI capabilities and their limits for office tasks",
            "distinguish suitable, unsuitable and check-only tasks",
            "use the task traffic light for a reasoned usage decision",
          ],
        },
      },
      {
        id: "m2",
        number: 2,
        minutes: 40,
        title: { de: "Sicher loslegen", en: "Starting safely" },
        objectives: {
          de: [
            "Werkzeug und Kontovoraussetzungen vor der Nutzung klären",
            "Daten minimieren und Uploads auf erlaubte, notwendige Inhalte begrenzen",
            "Kontext, Annahmen und unbekannte Punkte vor der ersten Eingabe getrennt dokumentieren",
          ],
          en: [
            "clarify tool and account requirements before use",
            "minimise data and limit uploads to permitted, necessary content",
            "document context, assumptions and open points separately before the first input",
          ],
        },
      },
      {
        id: "m3",
        number: 3,
        minutes: 45,
        title: { de: "Klar beauftragen", en: "Briefing clearly" },
        objectives: {
          de: [
            "Ziel, Kontext und Quellen in einem klaren Auftrag festlegen",
            "Format und Kriterien so beschreiben, dass Ergebnisse prüfbar werden",
            "Rückfragen und Iteration zur gezielten Verbesserung einsetzen",
          ],
          en: [
            "define goal, context and sources in a clear brief",
            "describe format and criteria so that results become verifiable",
            "use follow-up questions and iteration for targeted improvement",
          ],
        },
      },
      {
        id: "m4",
        number: 4,
        minutes: 60,
        title: { de: "Büro-Praxislabor", en: "Office practice lab" },
        objectives: {
          de: [
            "KI-Unterstützung für E-Mails und Meetingnotizen passend einsetzen",
            "Dokumente mit klaren Vorgaben überarbeiten und ihre Aussagen prüfen",
            "Tabellen mit nachvollziehbaren Zahlen- und Plausibilitätskontrollen bearbeiten",
            "Büroartefakte mit Quellen, Korrekturen und Freigabestatus dokumentieren",
          ],
          en: [
            "use AI support appropriately for emails and meeting notes",
            "revise documents against clear requirements and check their statements",
            "work on spreadsheets with traceable number and plausibility checks",
            "document office artefacts with sources, corrections and approval status",
          ],
        },
      },
      {
        id: "m5",
        number: 5,
        minutes: 45,
        title: { de: "Fehlerwerkstatt", en: "Error workshop" },
        objectives: {
          de: [
            "Halluzinationen und unbelegte Aussagen erkennen und stoppen",
            "Zahlen unabhängig nachrechnen und Quellen auf Belastbarkeit prüfen",
            "Bias in Ergebnissen erkennen und eine Korrektur oder Eskalation begründen",
          ],
          en: [
            "recognise and stop hallucinations and unsupported statements",
            "recalculate figures independently and check sources for reliability",
            "recognise bias in results and justify a correction or escalation",
          ],
        },
      },
      {
        id: "m6",
        number: 6,
        minutes: 35,
        title: { de: "Verantwortung", en: "Responsibility" },
        objectives: {
          de: [
            "Rechtsorientierung von verbindlicher Rechtsberatung unterscheiden",
            "Rollen, Verantwortlichkeiten und sensible Anwendungen angemessen einordnen",
            "bei Unsicherheit oder hohem Risiko sicher eskalieren",
          ],
          en: [
            "distinguish legal orientation from binding legal advice",
            "classify roles, responsibilities and sensitive applications appropriately",
            "escalate safely when uncertain or when risk is high",
          ],
        },
      },
      {
        id: "m7",
        number: 7,
        minutes: 45,
        title: { de: "Assistenz und Workflows", en: "Assistants and workflows" },
        objectives: {
          de: [
            "eine gepflegte Wissenssammlung als Grundlage für Assistenz nutzen",
            "Toolzugriff und Agentengrenzen für einen Workflow festlegen",
            "menschliche Freigabepunkte und Stopps in Assistenz-Workflows verankern",
          ],
          en: [
            "use a maintained knowledge collection as the basis for assistance",
            "define tool access and agent limits for a workflow",
            "anchor human approval points and stops in assistant workflows",
          ],
        },
      },
      {
        id: "m8",
        number: 8,
        minutes: 70,
        title: { de: "Fahrprüfung", en: "Driving test" },
        objectives: {
          de: [
            "die Sicherheits- und Qualitätsprinzipien ohne Hilfestellung abrufen",
            "ein synthetisches Praxisartefakt mit Prüfung und Freigabeentscheidung erstellen",
            "die eigene Entscheidung und die nächsten Verbesserungen reflektieren",
          ],
          en: [
            "recall the safety and quality principles without assistance",
            "create a synthetic practice artefact with a check and approval decision",
            "reflect on your own decision and the next improvements",
          ],
        },
      },
    ],
  },
]
