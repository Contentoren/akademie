# KI-Führerschein für Büro- und Wissensarbeit

Gemeinsame Inhaltsgrundlage für einen eigenständigen, deutschsprachigen Onlinekurs für kleine und mittlere Unternehmen. Dieses Paket ist toolneutral: Es setzt weder ein bestimmtes KI-Produkt noch ein externes Konto voraus. Wo ein echtes System später genutzt werden kann, muss der Kurs alternativ mit den hier vorgesehenen Simulationsoutputs lösbar bleiben.

## Einstieg für Lernende

Der Kurs trainiert einen einfachen, wiederholbaren Arbeitsablauf:

1. **Aufgabe wählen:** Was soll am Ende für wen und in welchem Format vorliegen?
2. **Kontext bereitstellen:** Nur nötige, synthetische oder freigegebene Informationen verwenden.
3. **Ergebnis prüfen:** Aussagen, Zahlen, Quellen, Ton und Risiken gegen die Ausgangslage prüfen.
4. **Verantwortlich freigeben:** Ein Mensch entscheidet über Nutzung, Korrektur, Eskalation oder Verwerfen.

Vor der ersten Eingabe steht immer der Sicherheitscheck. Übungen verwenden ausschließlich die fiktive **Nordlicht Büroservice GmbH** und die Datensätze D01–D08 aus `materialien/musterunternehmen.md`. Die Daten sind absichtlich ausreichend konkret für Rechnungen, Zusammenfassungen, Sicherheitsentscheidungen und Freigaben, enthalten aber keine echten personenbezogenen Daten.

Der Kurs ist asynchron bearbeitbar. Lesetexte, Aufgaben, Simulationsoutputs und Rückmeldungen müssen in der späteren Lernumgebung aus den versionierten Markdown-/JSON-Quellen importiert werden. Ein KI-Ergebnis ist nie automatisch eine Freigabe, ein Zertifikat oder ein Rechts-/Compliance-Nachweis.

## Einstieg für Implementierende und Redaktion

1. `kurs.json` als Manifest einlesen; die IDs, Dateipfade, Minuten und Lernziele sind verbindlich.
2. `IMPLEMENTIERUNG.md` als Inhalts- und Importvertrag lesen. Er legt Markdown-Struktur, Interaktionstypen, Bewertung, Barrierearmut, Verzweigungen und die Sicherheitsgrenze zwischen Lernenden- und Autor:innenbereich fest.
3. `materialien/musterunternehmen.md` unverändert als synthetisches Szenariopaket versionieren. D08 ist der getrennte redaktionelle Prüfschlüssel und darf bei einer Onlinepublikation nicht in den Lernendenbestand gelangen.
4. Die neun vorhandenen Moduldateien gemäß Dateiindex fachlich und redaktionell prüfen.
5. Die beiden vorhandenen Prüfungsdateien sowie `redaktion/qualitaet-und-betrieb.md` prüfen und vor einer Veröffentlichung die Akzeptanzkriterien in `IMPLEMENTIERUNG.md` ausführen.

### Sicherheits- und Geltungsgrenzen

- Kursfiktive Angaben sind keine Anleitung zum Umgang mit echten Kund:innen-, Beschäftigten- oder Geheimdaten.
- Es gibt kein Versprechen von Zertifizierung, Rechtskonformität, Datenschutzkonformität oder sicherem Verhalten in jeder Umgebung.
- Herstellerdokumentation und Herstellertexte werden nicht kopiert; Beispiele sind eigenständig formuliert.
- In Übungen dürfen nur die bereitgestellten synthetischen Daten oder ausdrücklich freigegebene Beispieldaten verwendet werden.
- Teilnahme und bestandener Abschluss sind getrennte Zustände. Ein Lernfortschritt erzeugt kein KI-Autozertifikat.

## Curriculum und Kompetenzzuordnung

| Modul | Zeit | Kompetenzschwerpunkt | Sichtbares Arbeitsergebnis |
|---|---:|---|---|
| M0 Startcheck | 15 min | Sicherheitsgrenze, Verantwortung und Ausgangslage erkennen | persönlicher Sicherheits- und Zielcheck |
| M1 KI sinnvoll einsetzen | 35 min | Fähigkeiten, Grenzen und passende Aufgaben mit der Aufgabenampel einschätzen | begründete Aufgabenampel-Entscheidung |
| M2 Sicher loslegen | 40 min | Werkzeug, Konto, Datenminimierung und sichere Uploads klären | begrenztes und sicheres Eingabepaket |
| M3 Klar beauftragen | 45 min | Ziel, Kontext, Quellen, Format, Kriterien, Rückfragen und Iteration verbinden | klarer, iterierbarer Arbeitsauftrag |
| M4 Büro-Praxislabor | 60 min | KI-Unterstützung an E-Mails, Meetingnotizen, Dokumenten und Tabellen erproben | geprüftes Büroartefakt |
| M5 Fehlerwerkstatt | 45 min | Halluzinationen, Zahlenfehler, Quellenprobleme und Bias erkennen und bearbeiten | Fehler- und Quellenprotokoll |
| M6 Verantwortung | 35 min | Rechtsorientierung, Rollen, sensible Anwendungen und Eskalation verantwortungsvoll einordnen | begründete Rollen- oder Eskalationsentscheidung |
| M7 Assistenz und Workflows | 45 min | Wissenssammlung, Toolzugriff, Agentengrenzen und menschliche Freigabepunkte gestalten | sicherer Assistenz-Workflow |
| M8 Fahrprüfung | 70 min | Wissen und Praxis unabhängig anwenden und reflektieren | Wissensleistung, Praxisartefakt, Reflexion |
| **Gesamt** | **390 min** |  |  |

Die verbindliche Stationsfolge lautet **Startcheck → KI sinnvoll einsetzen → Sicher loslegen → Klar beauftragen → Büro-Praxislabor → Fehlerwerkstatt → Verantwortung → Assistenz und Workflows → Fahrprüfung**. Der wiederkehrende Arbeitsablauf **Aufgabe wählen → Kontext bereitstellen → Ergebnis prüfen → verantwortlich freigeben** verbindet die Stationen, ersetzt aber nicht ihre Reihenfolge. Die Prüfung bewertet nicht die Wahl eines bestimmten Herstellers oder eine bestimmte Formulierung, sondern nachvollziehbare Entscheidungen und überprüfbare Ergebnisse.

## Dateiindex und Dateikonventionen

Pfade sind relativ zu diesem Verzeichnis. `vorbereitet` bezeichnet die gemeinsame Grundlage in diesem Änderungsschritt; `erstellt` bezeichnet einen vorhandenen eigenen KI-unterstützten Entwurf mit offener redaktioneller/fachlicher Freigabe; `geplant` bezeichnet eine erwartete Datei, deren Modul- oder Prüfungstext noch nicht erstellt werden soll.

| Pfad | Status | Zweck |
|---|---|---|
| `README.md` | vorbereitet | Nutzer-/Implementierereinstieg, Curriculum und Dateiindex |
| `kurs.json` | vorbereitet | Manifest, stabile IDs, Lernziele und Zeitplan |
| `IMPLEMENTIERUNG.md` | vorbereitet | wiederholbarer technischer Inhaltsvertrag |
| `materialien/musterunternehmen.md` | vorbereitet | vollständiges synthetisches Datenpaket D01–D08 und Übungsaufträge |
| `module/00-startcheck.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | M0, 3 Lektionen, 15 Minuten |
| `module/01-ki-sinnvoll-einsetzen.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | M1, 3 Lektionen, 35 Minuten |
| `module/02-sicher-loslegen.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | M2, 3 Lektionen, 40 Minuten |
| `module/03-klar-beauftragen.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | M3, 3 Lektionen, 45 Minuten |
| `module/04-buero-praxislabor.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | M4, 4 Lektionen, 60 Minuten |
| `module/05-fehlerwerkstatt.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | M5, 3 Lektionen, 45 Minuten |
| `module/06-verantwortung.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | M6, 3 Lektionen, 35 Minuten |
| `module/07-assistenz-und-workflows.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | M7, 3 Lektionen, 45 Minuten |
| `module/08-fahrpruefung.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | M8, 3 Lektionen, 70 Minuten |
| `pruefung/wissenspruefung.json` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | 20 objektive Wissensfragen mit getrenntem Lösungsschlüssel |
| `pruefung/praxispruefung.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | Praxisauftrag, Rubrik a0–a4 und Reviewablauf |
| `quellen-rechte.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | Quellen-, Eigenständigkeits- und Nutzungsnachweis |
| `redaktion/qualitaet-und-betrieb.md` | erstellt; eigener KI-unterstützter Entwurf; redaktionelle/fachliche Freigabe offen | Redaktionsprozess, Betrieb, Versionierung und Review |

### Dateinamen und IDs

- Moduldateien sind zweistellig nummeriert: `00` bis `08`.
- Lektionen verwenden stabile IDs `m0-l1` bis `m8-l3`; die Nummerierung zählt innerhalb des Moduls.
- Aufgaben verwenden stabile IDs wie `m4-l2-a1`. Optionen erhalten stabile IDs wie `opt-a`, `opt-b`; sie werden nicht aus dem sichtbaren Antworttext erzeugt.
- Szenariodaten verwenden ausschließlich die Quellen-IDs `D01` bis `D08`. Übungsaufträge in der Materialdatei verwenden `U01` bis `U07`.
- Umbenennen sichtbarer Titel ändert keine ID. Wird eine Aufgabe fachlich ersetzt, wird eine neue ID erzeugt und die alte versioniert stillgelegt.

## Prüfungsvereinbarung in Kurzform

Die vollständige technische Auslegung steht in `IMPLEMENTIERUNG.md`; die folgenden Eckdaten sind für die spätere Delegation verbindlich:

- M8 umfasst **25 Minuten Wissen, 35 Minuten Praxis und 10 Minuten Reflexion**.
- Die Wissensprüfung besteht aus **20 Multiple-Choice-Fragen mit je 1 Punkt**. Bei Mehrfachauswahl gilt nur die exakt geforderte Menge; zusätzliche oder fehlende Auswahl ist falsch.
- Bestanden ist der Abschluss ab **mindestens 16/20 Wissenspunkten** und **mindestens 16/20 Praxispunkten**, sofern kein ungelöster kritischer Daten- oder Freigabefehler vorliegt.
- Nach drei Wissensversuchen folgt menschlicher Review oder Reset. Eine Praxisrevision erfolgt mit menschlichem Feedback.
- Teilnahme, Bearbeitung und bestandener Abschluss werden getrennt gespeichert. Jede Korrektur wird versioniert.
- Freitext und Praxis werden von Menschen bewertet. Die Plattform darf daraus kein KI-Autozertifikat ableiten.

## Technischer Hinweis

Diese Lieferung enthält keine Plattformkomponenten, keine externen Assets und keine neuen Dependencies. Markdown und JSON sind die versionierten Inhaltsquellen. Die Modul- und Prüfungsdateien sind erstellt; JSON-Syntax, Manifestkonsistenz, Minutensummen und die Vollabnahme des Imports sind noch zu prüfen. Die Kursversion `1.0.0-entwurf` ist nicht veröffentlicht und nicht rechtlich freigegeben.
