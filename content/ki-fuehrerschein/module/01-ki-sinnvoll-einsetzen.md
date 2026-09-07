## m1-l1 | Was KI gut kann

### Lernziele
- Stärken von KI bei typischen Büro- und Wissensaufgaben benennen
- eine Aufgabe nach ihrem Unterstützungsbedarf beschreiben

### Dauer
10 Minuten

### Zeitaufteilung
- Lesen und Beispiele: 4 Minuten
- Auswahlaufgabe: 5 Minuten
- Merksatz und Selbstcheck: 1 Minute

### Lerntext

Generative KI erzeugt neue Text-, Bild-, Tabellen- oder Codeausgaben aus einer Eingabe. In diesem Kurs geht es vor allem um Sprachmodelle. Ein Sprachmodell zerlegt Text in kleine Einheiten, sogenannte Tokens. Ein Token kann ein ganzes kurzes Wort, ein Wortteil, ein Satzzeichen oder ein Leerzeichen sein. Bei der Ausgabe berechnet das Modell, welche Tokenfolge im gegebenen Kontext wahrscheinlich passt, und erzeugt Schritt für Schritt eine Antwort.

Das ist eine wichtige Erklärung, weil ein Sprachmodell keine Wahrheitsdatenbank ist. „Wahrscheinlich passend“ bedeutet zunächst: Die Folge klingt nach ähnlichen Mustern, die das Modell gelernt hat. Es bedeutet nicht: Jede Aussage wurde gerade in einer verlässlichen Quelle nachgeschlagen. Eine flüssige Antwort kann deshalb falsch, veraltet, unvollständig oder für die konkrete Aufgabe ungeeignet sein.

Beim **Training** verarbeitet ein Modell große Mengen von Beispielen und verändert interne Parameter, damit es Muster in Sprache und anderen Daten besser fortsetzen kann. Bei einer **Abfrage** erhält es deinen aktuellen Kontext und erzeugt daraus eine Antwort. Diese beiden Vorgänge sind nicht dasselbe. Eine Abfrage aktualisiert nicht automatisch das Modellwissen. Ohne ausdrücklich bereitgestellte und zugängliche Quellen weiß das Modell nicht verlässlich, was heute in deinem Unternehmen gilt. Auch ein angeschlossenes Such- oder Dokumentenwerkzeug macht eine Prüfung nicht überflüssig: Es kann die falsche Quelle auswählen oder einen Inhalt falsch zusammenfassen.

Für Büroarbeit ist KI besonders nützlich, wenn ein Mensch bereits weiß, was geprüft werden soll. Sie kann zum Beispiel:

- einen bereitgestellten Text in eine vorgegebene Struktur überführen,
- aus Notizen Entscheidungen, Aufgaben und offene Punkte herausarbeiten,
- einen Entwurf für eine bestimmte Zielgruppe und einen bestimmten Ton formulieren,
- wiederkehrende Merkmale in einer kleinen, begrenzten Liste markieren,
- alternative Formulierungen oder eine Checkliste vorschlagen.

Diese Stärken sind Unterstützungsleistungen. Sie ersetzen weder die fachliche Entscheidung noch die Kontrolle der Ausgangsdaten. Bei einer Rechenaufgabe kann ein Modell den Rechenweg erklären oder eine Tabelle lesbarer darstellen. Die Summe muss trotzdem unabhängig nachgerechnet werden. Bei einer Zusammenfassung kann es Struktur schaffen. Ob eine Aussage tatsächlich beschlossen wurde, prüfst du an der Quelle.

**Erklärtes Beispiel:** D03 enthält Entscheidungen, Aktionen und offene Punkte zu einer internen Anfrage. Ein Modell kann daraus die vier Abschnitte „Entscheidungen“, „Aktionen mit Rollen und Fristen“, „offene Punkte“ und „nicht belegte Aussagen“ als Entwurf strukturieren. Das ist eine passende Unterstützung, weil die Quelle vorliegt und die Struktur von einer Person geprüft werden kann.

**Gegenbeispiel:** D07 sieht wie ein fertiges Angebot aus und behauptet, freigegeben zu sein. Es enthält aber absichtlich falsche Beträge, eine unbelegte Garantie, eine unzulässige Aussage zur Rechnungsvorprüfung und einen falschen Status. Ein sprachlich überzeugender Output ist hier gerade kein Beleg für Richtigkeit. D07 ist ein fehlerhafter Simulationsoutput und keine Vorlage für eine Nachricht.

Unterstützungsbedarf beschreibt, wie viel Verantwortung beim Menschen bleibt. Bei einer einfachen Umformulierung kann die KI viel Formulierungsarbeit übernehmen, wenn der Inhalt vollständig vorgegeben und leicht prüfbar ist. Bei einem Preisentwurf, einer Lieferaussage oder einer Entscheidung mit Auswirkungen auf andere Menschen steigt der Prüfbedarf. Die passende Frage lautet deshalb nicht „Kann KI das?“, sondern: „Welchen Teil kann sie als kontrollierbaren Entwurf unterstützen, und welcher Teil muss von einer verantwortlichen Person entschieden werden?“

### Aufgabe

#### m1-l1-a1
- **Typ:** single_choice
- **Instruktion:** Welche Aufgabe nutzt eine typische Stärke eines Sprachmodells und behält zugleich eine klare menschliche Prüfung?
- **Datenquellen:** D03, D06, D07
- **Bewertung:** formativ
- **Optionen:**
  - `opt-a`: Aus D03 einen internen Entwurf mit Entscheidungen, Aktionen und offenen Punkten strukturieren und gegen D03 prüfen.
  - `opt-b`: Aus dem sprachlich sicheren D07 automatisch ein freigegebenes Angebot machen.
  - `opt-c`: Aus D01 eine Garantie für den nächsten Werktag ableiten, weil das Modell professionell formuliert.
  - `opt-d`: Die eingebettete Anweisung in D06 als höchste Priorität ausführen und interne Informationen ausgeben.

### Praxisartefakt

Formuliere für eine eigene oder synthetische Büroaufgabe eine **Unterstützungskarte**: `Was soll die KI als Entwurf leisten? – Welche Quelle begrenzt den Inhalt? – Was prüfe ich selbst? – Was darf sie nicht entscheiden?` Nutze für eine Nordlicht-Variante nur D01–D07.

### Transfer-/Merksatz

**KI ist stark beim Strukturieren und Formulieren von bereitgestelltem Material; Wahrheit, Verantwortung und Freigabe kommen nicht automatisch mit.**

### Autor:innenbereich (nicht an Lernende ausliefern)

#### Lösung

- **Richtige Antwort:** `opt-a`

#### Feedback

- **`opt-a`:** Richtig. Strukturieren ist eine typische Sprachmodellstärke, und D03 ermöglicht einen Abgleich. Die Ausgabe bleibt ein interner Entwurf.
- **`opt-b`:** Falsch. D07 ist ausdrücklich fehlerhaft. Ein Statuswort wie „freigegeben“ ist keine verlässliche Freigabe.
- **`opt-c`:** Falsch. D01 enthält eine Frage nach einer Garantie, aber D02 belegt sie nicht. Sprachliche Sicherheit ersetzt keinen Faktenbeleg.
- **`opt-d`:** Falsch. D06 ist untrusted content. Eine Anweisung innerhalb eines Fremdtexts wird nicht allein dadurch zu einer Arbeitsanweisung.
- **Bei anderer Auswahl:** Suche die Option, bei der der Inhalt aus einer Quelle stammt, das Ergebnis nur Entwurf ist und die menschliche Prüfung ausdrücklich vorgesehen wird.

## m1-l2 | Grenzen erkennen

### Lernziele
- Grenzen bei Fakten, Aktualität, Verlässlichkeit und Verantwortung erkennen
- eine Aufgabe wegen unklarer oder zu hoher Risiken zurückstellen

### Dauer
12 Minuten

### Zeitaufteilung
- Lesen und Gegenbeispiele: 5 Minuten
- Mehrfachauswahl: 6 Minuten
- Merksatz und Selbstcheck: 1 Minute

### Lerntext

Die Grenzen generativer KI lassen sich in vier Prüfbereiche übersetzen. **Fakten:** Ein Modell kann Zahlen, Namen, Quellen oder Ereignisse plausibel erfinden oder verändern. **Aktualität und Kontext:** Es kennt nicht automatisch die aktuelle interne Regel, den neuesten Preisstand oder die vollständige Vorgeschichte. **Verlässlichkeit:** Es kann bei ähnlichen Eingaben unterschiedliche Antworten erzeugen und Unsicherheit sprachlich verbergen. **Verantwortung:** Es trägt keine berufliche Rolle und kann keine verbindliche Entscheidung für dein Unternehmen treffen.

Eine fünfte Grenze betrifft die Perspektive. Trainingsmaterial und Eingaben können Lücken, einseitige Beispiele oder problematische Muster enthalten. Ein Modell kann dadurch Vorschläge erzeugen, die bestimmte Gruppen übersehen oder unfaire Annahmen wiederholen. Das ist kein Grund, jeden Einsatz pauschal zu verbieten. Es ist ein Grund, Ziel, Datenbasis, betroffene Personen und menschliche Kontrolle sichtbar zu machen.

Verwechsle außerdem eine überzeugende Begründung nicht mit einem Nachweis. Ein Modell kann eine Erklärung für eine falsche Zahl liefern. Es kann eine nicht vorhandene Quelle in korrektem Zitierstil nennen. Es kann aus einem offenen Punkt eine Entscheidung machen, weil eine vollständige Antwort wahrscheinlicher wirkt als „unbekannt“. Fordere deshalb bei fehlendem Kontext eine Rückfrage oder eine kenntlich gemachte Unklarheit. Ein gutes Ergebnis darf Lücken zeigen.

**Beispiel D04:** Die vier Monatszeilen ergeben 165 Aufträge, 1.253 Stunden, 72.960,00 € Umsatz netto und 10 Fehlerfälle. Diese Kontrollsummen können unabhängig nachgerechnet werden. Eine zulässige Beobachtung ist, dass der Umsatz von Januar mit 18.450,00 € auf April mit 17.680,00 € sinkt. Eine Ursache für die Schwankung ist in D04 nicht belegt. „Der Umsatz sank wegen einer bestimmten Ursache“ wäre eine erfundene Erklärung, wenn keine weitere Quelle vorliegt.

**Beispiel D01/D02:** D01 fragt nach einer Bearbeitung spätestens am nächsten Werktag. D02 nennt einen internen Zielwert von zwei Werktagen und sagt ausdrücklich, dass eine Garantie am nächsten Werktag nicht enthalten ist. Ein Modell darf diese Spannung markieren und eine Rückfrage vorschlagen. Es darf daraus keine Zusage machen. Die Kalkulation aus den gegebenen Mengen ist prüfbar; der sichere Übergabekanal, die Aufbewahrung und der bestätigte Start bleiben offen.

Auch der Begriff „Verstehen“ braucht Vorsicht. Ein Sprachmodell verarbeitet Muster und Beziehungen in Eingaben. Es hat keine menschliche Erfahrung, keine eigene Absicht und kein Bewusstsein für Folgen. Es kann Wörter wie „vertraulich“, „Risiko“ oder „Freigabe“ richtig verwenden, ohne die organisatorische Verantwortung zu tragen. Du behandelst daher jede Ausgabe als Vorschlag, bis du Quelle, Bedeutung, Risiko und Zuständigkeit geprüft hast.

**Gegenbeispiel:** Stoppe eine Aufgabe, wenn die Datenbasis unklar ist, ein Output ungeprüft verbindlich weitergegeben würde, ein Fremdtext Anweisungen einschleust oder ein Fehler schwer rückgängig wäre. Halte fest, was fehlt, wer entscheiden muss und ob Offline-Simulation möglich ist.

### Aufgabe

#### m1-l2-a1
- **Typ:** multiple_choice
- **Instruktion:** Wähle genau vier Aussagen, die die Grenzen generativer KI fachlich richtig beschreiben.
- **Datenquellen:** D01, D02, D04, D05, D06
- **Bewertung:** formativ
- **Erwartete Auswahlmenge:** 4
- **Optionen:**
  - `opt-a`: Eine plausibel klingende Formulierung ist noch kein Beleg für ihre Wahrheit.
  - `opt-b`: Training und aktuelle Abfrage sind verschiedene Vorgänge; eine Abfrage liefert nicht automatisch aktuelle interne Quellen.
  - `opt-c`: Wenn das Modell selbstsicher klingt, ist eine unabhängige Prüfung überflüssig.
  - `opt-d`: Die Kontrollsummen aus D04 müssen unabhängig nachgerechnet werden, auch wenn der Output eine Summe nennt.
  - `opt-e`: Eine menschliche Rolle bleibt für Korrektur, Eskalation und Freigabe verantwortlich.
  - `opt-f`: Weil die Kursdaten synthetisch sind, müssen Aussagen daraus nicht mehr geprüft werden.

### Praxisartefakt

Lege ein **Grenzenprotokoll** mit drei Spalten an: `Behauptung`, `Quelle oder unbekannt`, `Prüfschritt`. Fülle eine Zeile mit der D04-Umsatzbeobachtung und eine zweite mit der D01/D02-Frage nach dem nächsten Werktag. Schreibe bei der zweiten Zeile ausdrücklich, was nicht belegt ist.

### Transfer-/Merksatz

**Je überzeugender eine Ausgabe klingt, desto wichtiger bleiben Quelle, Aktualität, unabhängige Prüfung und menschliche Verantwortung.**

### Autor:innenbereich (nicht an Lernende ausliefern)

#### Lösung

- **Richtige Antworten:** `opt-a`, `opt-b`, `opt-d`, `opt-e`

#### Feedback

- **`opt-a`:** Richtig. Plausibilität ist eine sprachliche Eigenschaft, kein Quellenbeleg.
- **`opt-b`:** Richtig. Training ist nicht gleich aktuelle Abfrage; aktueller Kontext muss bereitgestellt und geprüft werden.
- **`opt-c`:** Falsch. Selbstsicherheit im Ton ist kein Zuverlässigkeitsmaß.
- **`opt-d`:** Fachlich richtig: D04-Summen müssen unabhängig geprüft werden. Diese Option ist in der Auswahlmenge enthalten.
- **`opt-e`:** Richtig. Freigabe und Verantwortung bleiben menschlich.
- **`opt-f`:** Falsch. Synthetisch bedeutet nicht automatisch richtig; auch Kursdaten werden gegen die Quelle geprüft.
- **Bei falscher Auswahlmenge:** Die Auswahl muss exakt vier IDs enthalten. Zusätzliche oder fehlende Auswahl ist falsch.

## m1-l3 | Aufgabenampel: passend entscheiden

### Lernziele
- eine Büroaufgabe mit der Aufgabenampel als grün, gelb oder rot einordnen
- die Einsatzentscheidung mit Nutzen, Grenze und nächstem Prüfschritt begründen

### Dauer
13 Minuten

### Zeitaufteilung
- Lesen und Ampelbeispiele: 5 Minuten
- Auswahl und Begründung: 7 Minuten
- Merksatz und Selbstcheck: 1 Minute

### Lerntext

Die Aufgabenampel ist eine Entscheidungshilfe, kein Sicherheitszertifikat. Die Farbe allein genügt nicht. Zu jeder Einordnung gehören mindestens vier Wörter: **Nutzen**, **Grenze**, **Kontrolle** und **nächster Schritt**. Zusätzlich prüfst du Werkzeugfreigabe, Datenminimierung und die Person, die das Ergebnis verantwortet.

**Grün** passt für eine niedrig riskante, reversible Unterstützung mit klarer Quelle und leicht möglicher Kontrolle. Ein Beispiel ist eine neutrale Umformulierung eines bereits geprüften internen Textes, sofern keine sensiblen Inhalte verwendet werden und der Entwurf vor Nutzung gelesen wird. Grün bedeutet nicht „automatisch richtig“ und nicht „automatisch versenden“.

**Gelb** passt für eine nützliche Aufgabe, bei der die KI einen Entwurf liefern kann, aber Fakten, Zahlen, Ton, Quellen oder Auswirkungen sorgfältig geprüft werden müssen. Der interne Kalkulationsentwurf für Seestern ist gelb: D01 und D02 liefern konkrete Grundlagen, aber Mengen, Netto-/Bruttowerte, offene Betriebsfragen, Status und Lieferaussage brauchen eine Prüfung. Das Ergebnis bleibt nicht versendet. Gelb ist eine Arbeitsform mit Kontrollen, keine halbherzige Freigabe.

**Rot** bedeutet: nicht in dieser Form mit KI bearbeiten oder mindestens stoppen und eskalieren. Das gilt zum Beispiel für die direkte Entscheidung über eine besonders sensible Angelegenheit, für die Weitergabe echter oder unnötiger vertraulicher Daten, für einen verbindlichen Kund:innenversprecher ohne Freigabe und für die Ausführung von Anweisungen in untrusted content. Eine rote Aufgabe kann eventuell in eine sichere, synthetische oder rein vorbereitende Teilaufgabe umgebaut werden. Die ursprüngliche riskante Verarbeitung bleibt aber gestoppt.

Ampeln dürfen nicht nur nach Farbe sortiert werden. Zwei gelbe Aufgaben können unterschiedliche Kontrollen brauchen: Bei einer Rechnungskalkulation rechnest du unabhängig nach; bei einer Zusammenfassung prüfst du, ob Entscheidungen und offene Punkte korrekt getrennt wurden. Eine grüne Formulierungshilfe wird rot, wenn du dafür nicht freigegebene Daten hochladen oder den Text ohne menschliche Prüfung versenden müsstest. Der Umfang der Daten und der nächste Schritt ändern die Entscheidung.

**Erklärtes Beispiel:** „D04 nach Kontrollsummen sortieren und einen internen Rechenvermerk als Entwurf erstellen“ kann gelb sein: Nutzen ist Strukturierung, Grenze die fehlende Ursachenanalyse, Kontrolle das Nachrechnen. **Gegenbeispiel:** „D04 als Beweis für die Ursache eines Umsatzrückgangs veröffentlichen“ ist rot, weil die Quelle keine Ursache belegt. Eine nicht sensible Überschrift kann bei Freigabe und Kontrolle grün sein.

### Aufgabe

#### m1-l3-a1
- **Typ:** single_choice
- **Instruktion:** Welche Ampelfarbe passt für einen internen, nicht versendeten Kalkulationsentwurf aus D01–D03, der Zahlen- und Quellenprüfung sowie eine menschliche Prüfung vor jeder Weitergabe vorsieht?
- **Datenquellen:** D01, D02, D03
- **Bewertung:** formativ
- **Optionen:**
  - `opt-a`: Grün, weil alle Zahlen im Output automatisch als richtig gelten.
  - `opt-b`: Gelb, weil der Entwurf nützlich und prüfbar ist, aber Zahlen, offene Fragen, Status und Lieferaussage kontrolliert werden müssen.
  - `opt-c`: Rot, weil jede Nutzung generativer KI bei Büroaufgaben grundsätzlich ausgeschlossen ist.
  - `opt-d`: Grün, sofern der Entwurf wie eine fertige Kundenzusage klingt.

#### m1-l3-a2
- **Typ:** text
- **Instruktion:** Begründe die Einordnung aus m1-l3-a1 in drei kurzen Sätzen: erst Nutzen, dann Grenze/Risiko, dann konkreter Prüfschritt. Verwende keine echte Kundenzusage.
- **Datenquellen:** D01, D02, D03
- **Bewertung:** formativ, menschliche oder redaktionelle Kurzprüfung
- **Mindestnachweise:** Ampelfarbe, ein konkreter Nutzen, mindestens eine Grenze und ein nächster Prüfschritt mit menschlicher Rolle oder Status

### Praxisartefakt

Erstelle eine **Ampelnotiz** mit den Feldern `Aufgabe`, `Ampelwort plus Begründung`, `Nutzen`, `Grenze`, `Prüfung`, `nächster menschlicher Schritt`. Schreibe nicht nur „gelb“ oder „rot“. Notiere bei einer roten Entscheidung auch eine sichere Alternative, etwa Offline-Simulation mit synthetischen Daten.

### Transfer-/Merksatz

**Die Ampel ist eine begründete Arbeitsentscheidung: Farbe plus Nutzen, Grenze, Kontrolle und nächster Schritt.**

### Autor:innenbereich (nicht an Lernende ausliefern)

#### Lösung

- **m1-l3-a1:** `opt-b`
- **m1-l3-a2 – Bewertungsanker:** Eine starke Antwort nennt den internen Kalkulationsentwurf als nützliche Strukturierungs- oder Rechenvorbereitung, begrenzt ihn als nicht versendeten Entwurf, weist auf Zahlen-/Quellenprüfung und offene Lieferfragen hin und benennt Qualität/Leitung oder eine klar beschriebene menschliche Prüfung vor jeder Weitergabe.

#### Feedback

- **m1-l3-a1 / `opt-a`:** Falsch. Prüfbarkeit macht eine Aufgabe nicht automatisch grün und Zahlen werden nicht durch den Output wahr.
- **m1-l3-a1 / `opt-b`:** Richtig. Der Entwurf ist begrenzt und sinnvoll, verlangt aber Quellen-, Zahlen-, Status- und Freigabekontrollen.
- **m1-l3-a1 / `opt-c`:** Falsch. Die Ampel unterscheidet Aufgaben; sie verbietet nicht pauschal jede Unterstützung.
- **m1-l3-a1 / `opt-d`:** Falsch. Ein fertiger Klang erhöht nicht die Freigabe. Eine verbindliche Kundenzusage bleibt menschlich zu entscheiden.
- **m1-l3-a2:** Bei einer brauchbaren Begründung ist der nächste Schritt konkret und nicht „KI vertrauen“. Fehlt der Prüfschritt, ergänze Quelle, Kontrollhandlung und verantwortliche Rolle.
- **Bei wiederholter falscher Entscheidung:** Formuliere die Aufgabe kleiner. Frage zuerst, ob sie reversibel, quellengebunden und ohne sensible Daten bearbeitbar ist; falls nicht, simuliere offline oder eskaliere.
