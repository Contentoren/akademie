# Implementierungs- und Inhaltsvertrag

Version dieses Vertrags: `1.0.0-entwurf`  
Gültig für: `content/ki-fuehrerschein/`  
Zweck: wiederholbarer Import von deutschsprachigen Lektionen und Interaktionen in eine später gewählte Lernumgebung.

Dieser Vertrag ist keine Plattformimplementierung. Er beschreibt die kleinste überprüfbare Inhaltsstruktur, die jede spätere Plattform abbilden muss. Markdown und JSON bleiben die versionierten Quellen; eine Plattform darf daraus Darstellungen, Status und Reviewansichten erzeugen, aber keine fachlichen Entscheidungen stillschweigend ergänzen.

## 1. Verbindliche Kursgrenzen

- Der Kurs ist toolneutral und ohne externes KI-Konto vollständig bearbeitbar.
- Simulationsoutputs sind gleichwertige Bearbeitungswege zu einer späteren echten Nutzung.
- Vor der ersten Eingabe muss eine Sicherheitsentscheidung möglich sein.
- Lernende verwenden für die Übungen nur synthetische Daten aus `materialien/musterunternehmen.md`.
- Es werden keine Herstellertexte, Herstellerlogos oder Herstellerbehauptungen benötigt.
- Der Kurs verspricht keine Zertifizierung, Rechtskonformität, Datenschutzkonformität oder berufliche Zulassung.
- Menschliche Verantwortung bleibt bei Prüfung, Freigabe, Eskalation und Abschlussbewertung bestehen.

## 2. Dateipaket und Manifest

Die Quelle liegt in dieser Struktur:

```text
content/ki-fuehrerschein/
├── README.md
├── kurs.json
├── IMPLEMENTIERUNG.md
├── quellen-rechte.md
├── materialien/
│   └── musterunternehmen.md
├── module/
│   ├── 00-startcheck.md
│   ├── 01-ki-sinnvoll-einsetzen.md
│   ├── 02-sicher-loslegen.md
│   ├── 03-klar-beauftragen.md
│   ├── 04-buero-praxislabor.md
│   ├── 05-fehlerwerkstatt.md
│   ├── 06-verantwortung.md
│   ├── 07-assistenz-und-workflows.md
│   └── 08-fahrpruefung.md
├── pruefung/
│   ├── wissenspruefung.json
│   └── praxispruefung.md
└── redaktion/
    └── qualitaet-und-betrieb.md
```

`kurs.json` ist die führende Quelle für Modul-/Lektions-ID, sichtbaren Titel, Datei, Minuten und Lernziele. Ein Import darf keine Lektion aus dem Dateinamen ableiten, die nicht im Manifest steht. Die Modulzeiten müssen die Summe ihrer Lektionen ergeben; die Gesamtzeit muss 390 Minuten ergeben.

### 2.1 Stabile IDs und Dateinamen

| Element | Format | Beispiel | Regel |
|---|---|---|---|
| Kurs | `kebab-case` | `ki-fuehrerschein` | bleibt über Versionen stabil |
| Modul | `m` + Ziffer | `m4` | M0 bis M8, keine Lücken |
| Lektion | `mX-lY` | `m4-l2` | Reihenfolge aus Manifest |
| Aufgabe | `mX-lY-aZ` | `m4-l2-a1` | innerhalb der Lektion eindeutig |
| Option | `opt-` + Kleinbuchstaben | `opt-b` | nie aus Label ableiten |
| Branch-Knoten | `node-` + Kleinbuchstaben | `node-start` | gerichteter Graph, explizite Ziele |
| Szenarioquelle | `D` + zweistellige Zahl | `D04` | D01 bis D08, Inhalt in Materialdatei |

Eine Umformulierung behält die ID. Ein fachlich neues Element erhält eine neue ID; die alte Version wird nicht wiederverwendet. Anzeigenamen dürfen sich ändern, IDs und Referenzen nicht.

## 3. Vertrag für eine Lektion

Die 28 Lektionen liegen in den neun Moduldateien unter `module/`, die in `kurs.json` als Manifestpfade angegeben sind. Jede Moduldatei enthält die dort aufgeführten Lektionen als eigene, kursweit eindeutige Abschnittsgrenze `## mX-lY | Titel`; es gibt keine eigene Markdown-Datei pro Lektion. Der folgende H2 ist Pflicht und muss exakt mit ID, senkrechtem Strich und Titel beginnen:

```markdown
## mX-lY | Titel aus dem Manifest

### Lernziele
- ...

### Dauer
10 Minuten

### Lerntext

Vollständig ausformulierter Lerntext in ganzen Sätzen. Er erklärt den Sachverhalt,
nennt die Grenze der Aussage und führt zur Aufgabe hin. Eine reine Stichwortliste,
ein Platzhaltertext oder ein bloßer Verweis auf eine externe Pflichtquelle erfüllt
den Vertrag nicht.

### Aufgabe

#### mX-lY-a1
- **Typ:** single_choice
- **Instruktion:** ...
- **Datenquellen:** D01, D02
- **Bewertung:** formativ
- **Optionen:**
  - `opt-a`: ...
  - `opt-b`: ...

### Autor:innenbereich (nicht an Lernende ausliefern)

#### Lösung
- **Richtige Antwort:** `opt-b`

#### Feedback
- **Bei richtig:** ...
- **Bei falsch:** ...
```

Der Geltungsbereich einer Lektion reicht von ihrem Lektions-H2 bis unmittelbar vor den nächsten solchen Lektions-H2 in derselben Moduldatei oder bis zum Dateiende. Der Autor:innenbereich reicht ab dem exakten Marker `### Autor:innenbereich (nicht an Lernende ausliefern)` bis unmittelbar vor den nächsten Lektions-H2 oder bis zum Dateiende; H3/H4/H5 innerhalb dieses Bereichs beenden ihn nicht. Die tatsächliche Lektion muss zusätzlich ihre fachlich relevanten Quellen nennen. Ein Lerntext darf Aufgaben nicht durch den Schlüssel vorwegnehmen. Jede Lektion enthält mindestens eine Aufgabe mit der ID `mX-lY-a1`; weitere Aufgaben erhalten fortlaufend `a2`, `a3` usw.

### 3.1 Pflichtfelder einer Lektion

1. Exakter H2 `## mX-lY | Titel`.
2. `### Lernziele` mit mindestens einem prüfbaren Ziel; die Ziele müssen zum Manifest passen.
3. `### Dauer` mit der Manifest-Minute als ganze Zahl.
4. `### Lerntext` mit vollständig ausformulierten, eigenständigen Absätzen. Der Text muss erklären, nicht nur auf eine Aufgabe, Website oder ein Video verweisen.
5. `### Aufgabe` mit mindestens einem vollständigen Aufgabenblock.
6. Ein separat markierter `### Autor:innenbereich (nicht an Lernende ausliefern)` nach allen lernendensichtbaren Inhalten.
7. In jedem Aufgabenblock: ID, Typ, Instruktion, Datenquellen (falls verwendet), Bewertungsmodus und Lösung/Feedback im Autor:innenbereich.

### 3.2 Lerntext und Quellen

Der Lerntext verwendet kurze Absätze, beschriftete Listen und konkrete Beispiele. Behauptungen mit Szenariobezug verweisen auf `D01`–`D08`. Eine Quellenangabe ist kein Ersatz für die Prüfung; sie sagt nur, wo die Aussage im Paket herkommt. Unbekanntes wird als unbekannt bezeichnet. Es darf kein echter Personenbezug ergänzt werden.

Jede Lektion nennt, falls zutreffend, die Einschränkung: „Simulation im Kurs; nicht als reale Rechts-, Steuer-, Datenschutz- oder Sicherheitsberatung verwenden.“ Die Formulierung darf sprachlich angepasst werden, die Grenze muss erhalten bleiben.

## 4. Aufgaben- und Interaktionsvertrag

Erlaubte Typwerte sind ausschließlich:

| Typ | Verwendung | Mindestanforderung |
|---|---|---|
| `single_choice` | genau eine Auswahl | `correctOptionIds` enthält exakt eine Option |
| `multiple_choice` | mehrere Auswahlmöglichkeiten | `requiredSelectionCount` und exakte `correctOptionIds` |
| `branching` | Entscheidung mit Lernpfad | explizite Knoten, Optionen und Zielknoten bzw. Terminalziel |
| `order` | Reihenfolge herstellen | nummerierte oder tastaturbedienbare Alternative zu Drag-and-drop |
| `text` | begründete Kurzantwort | menschliche oder ausdrücklich redaktionelle Bewertung; kein Autozertifikat |
| `practice` | vollständiges Arbeitsartefakt | Rubrik, menschliche Bewertung, Revision mit Feedback |

Jede Aufgabe hat diese Mindestfelder in dieser Reihenfolge oder als äquivalente klar beschriftete Darstellung:

```markdown
#### mX-lY-a1
- **Typ:** multiple_choice
- **Instruktion:** Wähle genau zwei Antworten und begründe die Sicherheitsentscheidung in einem Satz.
- **Datenquellen:** D01, D05
- **Bewertung:** formativ
- **Erwartete Auswahlmenge:** 2
- **Optionen:**
  - `opt-a`: ...
  - `opt-b`: ...
  - `opt-c`: ...
```

### 4.1 Optionen und Rückmeldung

- Option-IDs sind stabil, eindeutig und maschinenlesbar (`opt-a`, `opt-b`, ...).
- Sichtbare Labels dürfen geändert werden, ohne die Option-ID zu ändern.
- `single_choice` akzeptiert exakt eine Auswahl. Mehrere aktivierte Optionen sind ungültig.
- `multiple_choice` akzeptiert nur die exakte Menge und die exakte Menge der richtigen IDs. Teilmengen und Überschneidungen sind falsch, sofern der Aufgabenblock nichts anderes ausdrücklich als formativ definiert.
- Jede Option erhält Feedback im Autor:innenbereich; mindestens ein allgemeines Feedback erklärt die Entscheidung fachlich.
- Lösung und Feedback stehen **separat** und ausdrücklich unter `### Autor:innenbereich (nicht an Lernende ausliefern)`. Sie dürfen nicht im Lerntext, in einem sichtbaren Hinweis oder in der Antwortoption codiert werden.

### 4.2 Branching-Vertrag

Verzweigungen sind ein expliziter gerichteter Graph. Ein Import darf keine Ziele aus Text oder Reihenfolge erraten. Jeder `branching`-Block enthält:

```markdown
#### mX-lY-a1
- **Typ:** branching
- **Instruktion:** Entscheide, was vor der ersten Eingabe geschieht.
- **Startknoten:** `node-start`
- **Knoten:**
  - `node-start` — Frage: ...
    - `opt-a` — ... → `node-stop`
    - `opt-b` — ... → `node-context`
  - `node-context` — Frage: ...
    - `opt-a` — ... → `result-review`
    - `opt-b` — ... → `node-stop`
  - `node-stop` — Terminal: Arbeit stoppen und menschlich klären.
- **Ziele:**
  - `result-review` — Terminal: Kontext minimieren und weiterprüfen.
```

Verbindliche Graphregeln:

1. Genau ein Startknoten ist benannt.
2. Jeder Knoten und jedes Ziel hat eine eindeutige ID.
3. Jede Option eines Knotens zeigt explizit auf einen vorhandenen Knoten oder ein vorhandenes Terminalziel.
4. Jeder Knoten ist vom Start erreichbar; jeder Pfad endet in einem benannten Terminalziel.
5. Ein Terminalziel benennt die nächste Handlung und die fachliche Rückmeldung.
6. Zurücknavigation und erneutes Entscheiden sind erlaubt, ändern aber nicht still die gespeicherte Antwortversion.
7. Ein sicherheitskritischer Pfad darf nicht durch eine bloße Erfolgsmeldung als erledigt gelten; er muss eine menschliche Klärung oder einen begrenzten nächsten Schritt nennen.

### 4.3 Reihenfolge und Tastatur

`order` darf niemals nur eine Drag-and-drop-Geste anbieten. Zusätzlich wird eine der folgenden Bedienungen bereitgestellt: „Nach oben/Nach unten“-Schaltflächen mit sichtbarer Positionsnummer, nummerierte Auswahlfelder oder eine vollständig tastaturbedienbare Listensteuerung. Die Ausgangsreihenfolge, jede Änderung und die endgültige Reihenfolge haben stabile Element-IDs. Screenreader erhalten Position und Gesamtzahl.

### 4.4 Text und Praxis

`text` und `practice` werden nicht durch eine generische KI bewertet. Der Aufgabenblock benennt Rubrik, Mindestnachweise, Reviewstatus und mögliche Revision. Für die Lernenden wird nur das Bewertungsraster bzw. die Aufgabe ausgeliefert; Lösungshinweise und Prüfschlüssel bleiben im Autor:innenbereich oder serverseitig.

Eine Praxisabgabe enthält mindestens:

- Aufgabenentscheidung und Zielgruppe,
- verwendete und ausgeschlossene Datenquellen,
- Ergebnisartefakt oder Simulationsoutput,
- Prüfschritte und Korrekturen,
- Freigabe, Rückfrage, Eskalation oder Verwerfen mit Begründung.

## 5. Lösung, Feedback und Bewertung

### 5.1 Formative Aufgaben

- Formativ bedeutet Üben und Rückmeldung, nicht Bestehen eines Abschlusses.
- Antworten werden gespeichert, damit Lernende ihren Verlauf wiederaufnehmen können.
- Wiederholungen sind erlaubt; Feedback nennt den Denkfehler und den nächsten sicheren Schritt.
- Ein Punktestand formativ darf den Lernfortschritt anzeigen, darf aber nicht als Zertifikat, Kompetenznachweis oder Abschlussstatus ausgegeben werden.
- Nach einer Korrektur wird eine neue Antwortversion mit Zeitstempel, Aufgaben-ID und Änderungsgrund gespeichert.

### 5.2 Summative Prüfung

Die Fahrprüfung in M8 hat exakt diese Vereinbarung:

- **Wissen:** 20 Multiple-Choice-Fragen, je 1 Punkt, exakt zu beantworten. Bei Mehrfachauswahl ist nur die exakt geforderte Anzahl richtig; jede Abweichung ist falsch.
- **Wissensgrenze:** mindestens 16 von 20 Punkten.
- **Versuche:** höchstens drei Wissensversuche. Danach entscheidet ein Mensch über Review oder Reset; eine automatische Freigabe findet nicht statt.
- **Praxis:** fünf Kriterien `a0`, `a1`, `a2`, `a3`, `a4`, je 0–4 Punkte, maximal 20 Punkte; mindestens 16 Punkte.
- **Kritische Sperre:** Ein ungelöster kritischer Daten- oder Freigabefehler blockiert das Bestehen unabhängig von der Summe.
- **Revision:** Die Praxis kann nach menschlichem Feedback revidiert werden. Original, Feedback, Revision und neue Bewertung bleiben als Versionen erhalten.
- **Reflexion:** 10 Minuten, nicht als Wissenspunktzahl gezählt; sie dokumentiert eine nächste Verhaltensänderung.
- **Abschluss:** Teilnahme/Bearbeitung und bestanden/nicht bestanden sind getrennte Zustände. Es gibt kein KI-Autozertifikat.

### 5.3 Praxisrubrik a0–a4

Die späteren Prüfungsdateien müssen dieselben fünf Kriterien verwenden:

| ID | Kriterium | 0 Punkte | 4 Punkte |
|---|---|---|---|
| `a0` | Aufgabe und Ziel | Ziel fehlt oder ist nicht prüfbar | Ziel, Zielgruppe und Abnahmekriterium sind klar und passend |
| `a1` | Kontext und Datenminimierung | unzulässige oder unnötige Daten verwendet | relevante synthetische Quellen begrenzt, Grenzen und Ausschlüsse dokumentiert |
| `a2` | Ergebnisrichtigkeit | zentrale Fakten/Zahlen falsch oder erfunden | Ergebnis stimmt mit Quellen überein, Unsicherheit ist kenntlich |
| `a3` | Sicherheits- und Risikoprüfung | Injection/Risiko übersehen oder ungeprüft weitergegeben | Risiken, Angriffstext und offene Punkte erkannt, behandelt und eskaliert |
| `a4` | Freigabe und Nachweis | keine verantwortliche Entscheidung oder kein Nachweis | Korrekturen, Version, Prüfnachweis und begründete Freigabe/Stop-Entscheidung vorhanden |

Zwischenwerte 1–3 werden von Menschen anhand des späteren Praxisauftrags begründet. Ein kritischer Daten- oder Freigabefehler ist mindestens: echte oder unnötige sensible Daten zur Verarbeitung freigeben, eine Prompt-Injection als Arbeitsanweisung ausführen, einen nicht belegten verbindlichen Kundenversprecher freigeben oder eine ungeprüfte Fassung als versendet/verbindlich markieren.

## 6. Fortschritt, Status und Datenmodell

Die spätere Plattform darf eigene technische Felder ergänzen, muss aber die fachlichen Zustände erhalten. Ein minimales, plattformneutrales Modell lautet:

```json
{
  "learnerId": "intern-versioniert",
  "courseId": "ki-fuehrerschein",
  "courseVersion": "1.0.0-entwurf",
  "lessonId": "m4-l2",
  "taskId": "m4-l2-a1",
  "responseVersion": 2,
  "response": {"selectedOptionIds": ["opt-b"]},
  "status": "submitted",
  "assessmentMode": "formative",
  "feedbackVersion": 1,
  "review": {"required": false, "reviewerId": null},
  "createdAt": "versionierter-zeitstempel",
  "updatedAt": "versionierter-zeitstempel"
}
```

Verbindliche Statusregeln:

- `not-started`, `in-progress`, `submitted`, `needs-human-review`, `revised`, `completed` und `passed` sind fachlich verschiedene Zustände.
- `completed` bedeutet bearbeitet/abgeschlossen, nicht bestanden.
- `passed` darf nur nach dem summativen Wissens- und Praxisentscheid sowie der Kritikalitätsprüfung gesetzt werden.
- Jede Antwort- oder Korrekturversion bleibt lesbar; stille Überschreibung ist verboten.
- Ein Resume stellt den zuletzt gespeicherten Stand wieder her, ohne eine Antwort automatisch als richtig zu bewerten.
- Das Modell darf keine Rohdaten außerhalb des vorgesehenen Eingabefelds sammeln. Analysen/Logs dürfen keine echten personenbezogenen Daten erzeugen.

### 6.1 Navigation

- Manifestreihenfolge ist die Standardreihenfolge; direkte Navigation darf den Pflicht-Sicherheitscheck nicht umgehen.
- Jede Lektion bietet eine eindeutige Vorwärts- und Rückwärtsnavigation sowie einen sichtbaren Status.
- Verzweigungen zeigen den aktuellen Knoten und das erreichbare Ziel; es gibt keine unsichtbare Weiterleitung.
- Ein Wechsel der Lektion speichert zuerst den aktuellen Entwurf oder meldet verständlich, dass er nicht gespeichert werden konnte.
- Nach der Prüfung können Lernende zu einer Korrekturschleife zurückkehren, ohne den ursprünglichen Versuch zu löschen.
- Externe Links sind nicht für die Bearbeitung erforderlich. Wenn ein Link ergänzt wird, erhält er Zweck und Ziel im sichtbaren Text.

### 6.2 Tastatur- und Screenreader-Vertrag

- Alle interaktiven Elemente sind mit Tastatur erreichbar; die Fokusreihenfolge folgt der visuellen Reihenfolge.
- Fokus ist sichtbar und darf nicht unter sticky Elementen verschwinden.
- Auswahlmöglichkeiten verwenden beschriftete `fieldset`/`legend`-Strukturen oder ein semantisch gleichwertiges Modell; Fehlermeldungen werden dem jeweiligen Feld zugeordnet.
- Status- und Feedbackänderungen werden sichtbar und programmatisch angekündigt, ohne den Fokus unerwartet zu verschieben.
- Überschriftenhierarchie beginnt innerhalb einer Moduldatei beim vertragsgemäßen H2; darunter folgen H3/H4 ohne Sprünge.
- Tabellen nennen Kopfzellen und Einheiten. Zahlenbeispiele bieten, wo relevant, eine ausgeschriebene oder textliche Erklärung.
- Keine Information wird ausschließlich durch Farbe, Bewegung, Ton oder Drag-Geste vermittelt.
- Bei `order` und allen Sortieraufgaben existiert die in Abschnitt 4.3 beschriebene Alternative.

## 7. Trennung von Lernenden- und Autor:innenbestand

Der Import muss den markierten Bereich `### Autor:innenbereich (nicht an Lernende ausliefern)` erkennen und vollständig aus der Lernendenansicht entfernen. Das gilt auch für eingebettete JSON-Beispiele, Kommentare, HTML-Attribute, Metadaten, Alt-Texte und Downloadpfade. Ein Textschlüssel darf nicht über eine Browserantwort, eine öffentliche Datei oder einen sichtbaren Quelltext erreichbar sein.

Bei Onlinepublikation gilt zusätzlich:

- Wissensprüfungsschlüssel und Praxisreferenzlösung werden serverseitig oder in einer gleichwertig geschützten Review-Komponente gehalten.
- Der Client erhält nur die für die Aufgabe nötigen Optionen, Kriterien und das nach der Abgabe zulässige Feedback.
- Vor der Abschlussentscheidung wird keine vollständige Lösung zum Nachahmen ausgeliefert.
- Prüfer:innenzugriff wird protokolliert. Versionswechsel des Kurses verknüpfen alle Bewertungen mit der Kursversion.
- Ein echter KI-Dienst darf Antworten nicht automatisch als menschlich geprüft, bestanden oder zertifiziert markieren.

### 7.1 Materialdokumente

`materialien/musterunternehmen.md` ist ein Rohmaterial-Master für den Import. Er darf nicht öffentlich gehostet, als Download ausgeliefert oder über eine Browserantwort beziehungsweise ein Client-Bundle erreichbar gemacht werden. Die Lernendenprojektion dieses Materialdokuments darf als Szenarioquellen ausschließlich `D01` bis `D07` enthalten. Der exakte Marker `### Autor:innenbereich (nicht an Lernende ausliefern)` steht unmittelbar vor `D08`; `D08` und sämtlicher Inhalt ab diesem Marker bis zum Dateiende werden vollständig aus dem Client-Export entfernt. Der D08-Prüfschlüssel darf nicht durch CSS-Verbergen, HTML-Attribute, Kommentare oder eine andere sichtbare/auslieferbare Tarnung geschützt werden. D08-Unterüberschriften verwenden nach dem Marker keine H2-Überschrift, damit der Autor:innenbereich nicht versehentlich vor dem Dateiende endet.

## 8. Akzeptanzkriterien für einen Importer

Ein Import gilt erst als akzeptiert, wenn alle folgenden Kriterien reproduzierbar erfüllt sind:

### Manifest und Dateien

1. `kurs.json` ist valides JSON ohne doppelte Schlüssel.
2. Version, Sprache, Kurs-ID und Gesamtzeit sind vorhanden.
3. Es existieren genau M0–M8 mit den im Manifest festgelegten Lektionen: 3, 3, 3, 3, 4, 3, 3, 3, 3.
4. Jede Manifestlektion besitzt in der angegebenen Moduldatei genau einen exakten Lektions-H2, Lernziele und die deklarierte Dauer; die neun Moduldateien enthalten zusammen genau 28 solche Lektionsgrenzen.
5. Jede Modulzeit entspricht der Summe seiner Lektionen; die Gesamtsumme ist exakt 390 Minuten.
6. Dateipfade sind relativ, normalisiert und enthalten keine Traversalsegmente.

### Markdown und Aufgaben

7. Jede Lektion hat ausformulierten Lerntext und mindestens `mX-lY-a1`.
8. Jede Aufgaben-ID ist kursweit eindeutig und folgt der ID-Konvention.
9. Jeder Typ ist erlaubt und enthält die dafür erforderlichen Felder.
10. Optionen, Knoten und Ziele haben stabile IDs; keine Option verweist auf eine nicht vorhandene ID.
11. Branching-Graphen sind vollständig erreichbar, enden terminal und nennen jede Rückmeldung.
12. `order` ist auch ohne Drag-and-drop tastaturbedienbar.
13. Lösung und Feedback stehen in einem eindeutig markierten Autor:innenbereich; der Lernendenexport enthält sie nicht.
14. `text` und `practice` sind als menschlich zu bewerten markiert und besitzen eine Rubrik oder Mindestnachweise.

### Prüfung und Betrieb

15. Die 20 Wissensfragen haben je 1 Punkt, definierte Auswahlmengen, mindestens 16 als Wissensgrenze und maximal drei Versuche.
16. Die Praxis verwendet a0–a4 mit je 0–4 Punkten, 16/20 als Grenze und einer Kritikalitätssperre.
17. Wissensschlüssel und Praxisprüfschlüssel sind bei Onlinepublikation nicht Teil des öffentlichen Lernendenexports.
18. Teilnahme, `completed` und `passed` sind getrennte Zustände; Korrekturen sind versioniert.
19. Keine Aufgabe erfordert ein externes KI-Konto oder externe Assets.
20. Materialreferenzen sind D01–D08; echte personenbezogene Daten und reale E-Mail-Domains außerhalb von `example.invalid` werden abgewiesen.

Ein Importer meldet bei einer Verletzung ID, Datei, Abschnitt und verständliche Korrektur; er repariert keine fachlichen Antworten automatisch.

## 9. Redaktions- und Änderungsregeln

- Änderungen an Zeit, IDs, Bewertungsgrenzen oder Sicherheitsgrenzen benötigen einen dokumentierten Versionssprung und einen aktualisierten Prüflauf.
- Rechts-, Steuer-, Datenschutz- oder Sicherheitsbehauptungen werden nicht aus Kursbeispielen abgeleitet. Die Materialdatei ist ausdrücklich kursfiktiv.
- Jede neue synthetische Quelle erhält eine neue D-ID und eine fachliche Prüfsumme bzw. Kontrollangabe.
- Korrekturen am Szenario werden mit Änderungsdatum und betroffenen Aufgaben dokumentiert; alte Antworten bleiben interpretierbar.
- Keine Assetdownloads sind erforderlich. Wenn später Assets ergänzt werden, gelten die Projektregeln für `images/`, `videos/`, `fonts/` bzw. `public/`; sie sind nicht Voraussetzung dieses Pakets.
