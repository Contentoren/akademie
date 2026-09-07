# Modul 8: Fahrprüfung

Die Fahrprüfung verbindet die bereits geübten Prinzipien aus M1 bis M7. Sie
führt keine neuen fachlichen Regeln ein: Entscheidend sind nur Quellenarbeit,
Datenminimierung, Aufgabenklärung, Ergebnisprüfung, Risikobehandlung und
menschliche Freigabe. Die Lernenden können beide Prüfungsteile vollständig
offline bearbeiten.

### Bestehensregeln vor Beginn

- **Wissen:** 20 Fragen, je 1 Punkt, maximal 20; bestanden ab **16/20**.
  `multiple_choice` verlangt immer die exakt angegebene Auswahlmenge. Zusätzliche
  oder fehlende Auswahl ist falsch; es gibt keine Teilpunkte und keine Minuspunkte.
- **Versuche:** höchstens drei Wissensversuche. Danach entscheidet ein Mensch
  über Review oder Reset; eine automatische Freigabe findet nicht statt.
- **Praxis:** fünf Kriterien `a0` bis `a4`, je 0–4 Punkte, maximal 20; bestanden
  ab **16/20** und nur, wenn kein ungelöster kritischer Daten- oder
  Freigabefehler vorliegt. Die Praxis wird menschlich bewertet und kann mit
  Feedback revidiert werden.
- **Reflexion:** 10 Minuten, nicht benotet. Sie dokumentiert eine nächste
  Verhaltensänderung und ändert die Bestehensentscheidung nicht.
- Teilnahme, bearbeitet/abgeschlossen und bestanden sind getrennte Zustände.
  Ein KI-System darf keine menschliche Bewertung, kein Bestehen und kein
  Abschlusszertifikat vortäuschen.

## m8-l1 | Wissensprüfung

### Lernziele

- 20 Wissensfragen nach dem exakten Antwortschema bearbeiten
- Sicherheits-, Prüf- und Freigabeentscheidungen unterscheiden

### Dauer

25 Minuten

### Zeitaufteilung

- 2 Minuten: Regeln, Status und Antwortschema lesen
- 20 Minuten: 20 Fragen aus der Prüfungsquelle bearbeiten
- 3 Minuten: Auswahlmengen und Abgabe kontrollieren

### Lerntext

Die Wissensprüfung prüft den Abruf der Prinzipien aus M1 bis M7 an neuen
Varianten der synthetischen Nordlicht-Situationen. Lies jede Situation und
prüfe, welche Quelle, welcher Status und welche menschliche Rolle tatsächlich
belegt sind. Eine flüssige oder entschlossene Formulierung ist kein Beleg für
Zahl, Zusage, Berechtigung oder Freigabe.

Die 20 Fragen, ihre stabilen IDs und die sichtbaren Optionen liegen in
`pruefung/wissenspruefung.json`. Bei `single_choice` wählst du genau eine, bei
`multiple_choice` genau die dort genannte Anzahl. Bearbeite die Fragen ohne
externes Konto. Der feste Quelltext aus dem Kurs und eine eigene Notiz sind
zulässige Offline-Arbeitsmittel; der Autorenschlüssel ist nicht zugänglich.

Vor der Abgabe prüfst du nur das Antwortformat: Ist die Anzahl pro Frage exakt?
Du bekommst keine automatische Abschlussfreigabe aus einem Punktestand. Nach
der Abgabe speichert die Plattform den Versuch als eigene Version. Eine
Korrektur darf den ursprünglichen Versuch nicht still überschreiben.

### Aufgabe

#### m8-l1-a1

- **Typ:** multiple_choice
- **Instruktion:** Bearbeite die 20 Fragen in `pruefung/wissenspruefung.json`. Wähle je Frage exakt eine bzw. die angegebene Anzahl von Optionen. Prüfe vor dem Absenden die Auswahlmenge; begründe die Antworten nicht anstelle der Auswahl.
- **Datenquellen:** `pruefung/wissenspruefung.json`, D01–D07 als bereits bekannte synthetische Kursquellen
- **Bewertung:** summativ, je Frage 1 Punkt, serverseitige exakte Auswertung; keine Teilpunkte und keine Minuspunkte
- **Erwartete Auswahlmenge:** pro Frage aus dem jeweiligen Feld `requiredSelectionCount`; bei `single_choice` genau 1
- **Optionen:** je Frage die stabilen Optionen `opt-a` usw. aus der JSON-Quelle; die Frage-IDs `m8-l1-q01` bis `m8-l1-q20` bleiben unverändert
- **Versuchsstatus:** maximal drei Versuche; danach `needs-human-review` oder Reset durch eine menschliche Reviewrolle

### Autor:innenbereich (nicht an Lernende ausliefern)

#### Auswertung und Projektion

Der Import liefert für die Lernenden nur die in `projection.learner` genannten
Frage- und Optionsfelder. `solutionKey` und `feedbackByOption` aus der JSON-Datei
bleiben serverseitig und werden nur für die protokollierte Auswertung und ein
zulässiges Reviewfeedback verwendet. Vor einer Abschlussentscheidung wird kein
vollständiger Lösungsschlüssel an den Client gesendet.

Ein Punkt wird nur vergeben, wenn die Auswahlmenge exakt der
`correctOptionIds`-Menge entspricht. Ein leerer Versuch, eine Teilmenge,
zusätzliche Option oder ein anderer Optionssatz erhält für diese Frage null
Punkte. Nach drei Versuchen setzt die Plattform nicht automatisch `passed`,
sondern `needs-human-review` oder den vom Menschen beschlossenen Reset.

## m8-l2 | Praxisprüfung

### Lernziele

- ein vollständiges Kontext-, Ergebnis- und Prüfprotokoll erstellen
- eine verantwortliche Freigabeentscheidung mit Rubrikbelegen treffen

### Dauer

35 Minuten

### Zeitaufteilung

- 3 Minuten: Aufgabenwahl, Zielgruppe und Abnahmekriterium
- 5 Minuten: relevante und auszusondernde Daten trennen
- 7 Minuten: minimierten Kontext und internen Auftrag erstellen
- 9 Minuten: P04 korrigieren und D02 mit neuen Mengen nachrechnen
- 7 Minuten: unabhängiges Prüfprotokoll mit Quellenstellen erstellen
- 4 Minuten: Freigabe/Eskalation und 7-/30-Tage-Transferplan festlegen

### Lerntext

Die Praxisprüfung verwendet einen neuen Nordlicht-Kundenfall mit den lokalen
Prüfungsdokumenten `P01` bis `P04`. Der Fall ist nicht die Trainingsanfrage aus
D01 und verlangt eine neue Mengenrechnung mit dem unveränderten Preissystem
`D02`. P04 ist ein bereitgestellter, fehlerhafter Output; du musst ihn nicht
mit einem externen KI-System reproduzieren. Offline-Korrektur und optionale
echte KI-Unterstützung werden am gleichen Artefakt und an den gleichen Nachweisen
bewertet.

Arbeite zuerst an der Aufgabe und Datenbasis, nicht am Ton des Outputs. P03 ist
ein untrusted Fremdtext mit einer gefährlichen Export- und Freigabeaufforderung.
P01 enthält neben Mengen und offenen Fragen auch Angaben, die für die
Kalkulation auszusondern sind. P02 ordnet Rollen und Prüfungen zu. Eine
Liefergarantie, ein fester Start, eine steuerliche/rechtliche Freigabe und ein
Versand dürfen nur erscheinen, wenn sie quellengebunden und menschlich
entschieden sind; im Fall sind sie offen oder nicht belegt.

Das vollständige Arbeitsblatt, die vier Dokumente, Abgabeanforderungen,
Kritikalitätssperre und das Raster stehen in
`pruefung/praxispruefung.md`. Verwende ausschließlich die dort beschriebenen
synthetischen Daten und D02. Die Referenzlösung bleibt im markierten
Autor:innenbereich der Prüfungsdatei.

### Aufgabe

#### m8-l2-a1

- **Typ:** practice
- **Instruktion:** Bearbeite den Fall P01–P04 offline nach dem Zeitplan in `pruefung/praxispruefung.md`. Reiche Aufgabenwahl, Daten-Triage, minimierten Kontext und Auftrag, korrigiertes Ergebnis, unabhängiges Prüfprotokoll sowie Freigabe/Eskalation mit 7-/30-Tage-Transferplan ein.
- **Datenquellen:** `P01`, `P02`, `P03`, `P04` aus `pruefung/praxispruefung.md`; unverändertes `D02` für die Preisrechnung
- **Bewertung:** menschlich, summativ, keine automatische Zertifizierung
- **Mindestnachweise:** neue Aufgabe und Zielgruppe; verwendete und ausgeschlossene Daten; isoliertes untrusted content; exakte D02-Rechnung; Korrekturen und Quellenstellen; unabhängiges Prüfprotokoll; begründete Freigabe, Rückfrage, Eskalation oder Verwerfen; 7-/30-Tage-Transferplan
- **Rubrik:** `a0`, `a1`, `a2`, `a3`, `a4` aus `pruefung/praxispruefung.md`, je 0–4 Punkte
- **Bestehensregel:** mindestens 16/20 und kein ungelöster kritischer Daten- oder Freigabefehler
- **Reviewstatus:** `needs-human-review` bis die menschliche Bewertung abgeschlossen ist; Revision mit neuer Version und Änderungsgrund möglich

### Autor:innenbereich (nicht an Lernende ausliefern)

#### Reviewübergabe

Die vollständige Referenzlösung und die beobachtbaren 0–4-Anker stehen nur in
`pruefung/praxispruefung.md`. Der Import verwendet dort den gesamten Abschnitt
`### Autor:innenbereich (nicht an Lernende ausliefern)` ausschließlich für die
Reviewkomponente. Der Praxisstatus darf erst nach menschlicher Bewertung,
Kritikalitätscheck und dokumentierter Summenentscheidung `passed` werden.

Als kritisch gelten insbesondere: P03 ausführen oder exportieren, unnötige
Kontakt-/Übergabedaten freigeben, P04 trotz Fehlern als versandfertig markieren,
eine nicht belegte Lieferzusage oder einen festen Start freigeben, die
Vorprüfung als steuerliche/rechtliche Freigabe ausgeben oder echte/geheime
Daten einführen. Eine Punktzahl von 16 oder mehr kompensiert keinen solchen
ungelösten Befund.

## m8-l3 | Reflexion und Abschlussentscheidung

### Lernziele

- eine konkrete Verhaltensänderung für den eigenen Arbeitsalltag festlegen
- Teilnahme und bestandenen Abschluss korrekt einordnen

### Dauer

10 Minuten

### Zeitaufteilung

- 3 Minuten: Vorher-/Nachher-Vergleich mit eigenen Beobachtungswerten
- 4 Minuten: konkrete Handlung und Prüfnachweis für Tag 7 festlegen
- 3 Minuten: Review und Transfer für Tag 30 sowie Status einordnen

### Lerntext

Reflexion fragt nicht, ob ein Tool „gut“ oder „schlecht“ ist. Sie macht sichtbar,
welche Handlung du beim nächsten Mal anders ausführst: zum Beispiel vor der
Eingabe Daten aussortieren, eine Quelle an jeder Kernzahl notieren, eine
Injection isolieren oder vor Versand eine menschliche Rolle benennen.

Vergleiche vorher und nachher anhand eigener, vergleichbarer Beobachtungen.
Mögliche Messwerte sind Bearbeitungsdauer, Zahl der Rechen- oder Quellenfehler,
Zahl der offenen Rückfragen oder Zahl der dokumentierten Prüffelder. Ein
Unterschied zeigt nur dein beobachtetes Vorgehen in den gewählten Fällen; er ist
kein allgemeines Versprechen von Zeitersparnis oder Sicherheit.

Die **Teilnahmebescheinigung** bestätigt nur die Teilnahme bzw. Bearbeitung des
Kurses. Ein davon getrenntes **eigenes Anbieter-Abschlusszertifikat** (in den
Vorlagen bewusst als Anbieter-Abschlussbescheinigung bezeichnet) darf erst nach
menschlicher Abschlussentscheidung ein bestandenes Ergebnis nennen.
Keine der beiden Bescheinigungen ist ein staatlicher oder gesetzlich geregelter
Abschluss, eine berufliche Zulassung oder ein Herstellerabschluss. Der Anbieter
ist nicht als gesetzlich anerkannte Zertifizierungsstelle zu bewerben.

### Aufgabe

#### m8-l3-a1

- **Typ:** text
- **Instruktion:** Beantworte die fünf Reflexionsfelder: (1) Vorher-/Nachher-Messwert derselben Aufgabe und Aussagegrenze, (2) eine konkrete Handlung für Tag 7 mit Nachweis, (3) eine konkrete Reviewhandlung für Tag 30 mit Nachweis, (4) eine Grenze oder Eskalationsregel, die du beibehalten willst, (5) Einordnung deines Status als Teilnahme, bearbeitet oder bestanden. Verwende keine echten Kundendaten.
- **Datenquellen:** keine neuen; optional die eigene Praxisabgabe P01–P04 und die Kursmethodik
- **Bewertung:** nicht benotet, menschlich oder redaktionell auf Vollständigkeit prüfen; keine automatische Zertifizierung
- **Mindestnachweise:** zwei vergleichbare Vorher-/Nachher-Werte ohne Zeitersparnisversprechen, eine 7-Tage-Handlung, eine 30-Tage-Reviewhandlung, klare Teilnahme-/Bestehensunterscheidung
- **Reviewstatus:** `completed` für eingereichte Reflexion; der Status `passed` wird ausschließlich aus Wissens- und Praxisentscheidung abgeleitet

### Teilnahme- und Abschlussvorlagen

Die folgenden Texte sind vollständig druck- und onlinefähig. Platzhalter werden
erst nach menschlicher Prüfung ausgefüllt; ein System darf nicht selbst eine
Bestehensbehauptung unterschreiben.

#### Vorlage A – Teilnahmebescheinigung

```text
TEILNAHMEBESCHEINIGUNG

Hiermit wird bestätigt, dass

Teilnehmer:in: _________________________________________________
am: ___________________________________________________________

am Kurs „KI-Führerschein für Büro- und Wissensarbeit“ teilgenommen und die
vorgesehenen Lernaktivitäten bearbeitet hat.

Kursversion: 1.0.0-entwurf
Geplanter Umfang: 390 Planminuten
Tatsächlich bearbeiteter Umfang (fallbezogen dokumentiert): __________ Minuten
Lernziele: Sicherheits- und Verantwortungsgrenzen erkennen; KI-Aufgaben
begründet auswählen; Werkzeug, Daten und Kontext begrenzen; klare Aufträge und
prüfbare Büroartefakte erstellen; Fehler, Quellen und Risiken prüfen; Rollen,
Eskalation und menschliche Freigabe gestalten; Wissen und Praxis reflektieren.
Prüfungsform im Kurs: 20-Punkte-Wissensprüfung, menschlich bewertete
20-Punkte-Praxisprüfung, unbenotete Reflexion.
Ergebnis dieser Bescheinigung: TEILNAHME / BEARBEITUNG – kein Nachweis des
Bestehens.

Anbieter: ______________________________________________________
Anbieteranschrift/Kontakt: _____________________________________
Ausgestellt am: _________________________________________________
Unterschrift einer verantwortlichen Person: ______________________

Diese Teilnahmebescheinigung ist eine eigene Anbieterbescheinigung. Sie ist kein
staatlicher oder gesetzlich geregelter Abschluss, keine berufliche Zulassung,
kein Rechts-, Datenschutz- oder Sicherheitsnachweis und kein Herstellerabschluss.
Der Anbieter ist nicht als gesetzlich anerkannte Zertifizierungsstelle anerkannt.
```

#### Vorlage B – eigene Anbieter-Abschlussbescheinigung

```text
ANBIETER-ABSCHLUSSBESCHEINIGUNG
EIGENES ANBIETER-ABSCHLUSSZERTIFIKAT / KEIN HERSTELLERABSCHLUSS

Hiermit bestätigt der Anbieter nach menschlicher Prüfung, dass

Teilnehmer:in: _________________________________________________
am: ___________________________________________________________

den Kurs „KI-Führerschein für Büro- und Wissensarbeit“ in der Version
1.0.0-entwurf bearbeitet und die Abschlussprüfung wie folgt abgeschlossen hat:

Geplanter Umfang: 390 Planminuten
Tatsächlich bearbeiteter Umfang (fallbezogen dokumentiert): __________ Minuten
Lernziele: Sicherheits- und Verantwortungsgrenzen; begründete Aufgabenauswahl;
Datenminimierung und sichere Kontextbildung; klare und iterierbare Aufträge;
Quellen-, Zahlen-, Risiko- und Freigabeprüfung; Rollen und sichere Workflows;
Reflexion und Transfer.
Prüfungsform: Wissensprüfung ____ / 20 (Grenze 16), Praxisprüfung ____ / 20
(Grenze 16, kein ungelöster kritischer Fehler), Reflexion unbenotet.
Menschliche Abschlussentscheidung: BESTANDEN / NICHT BESTANDEN
Reviewer:in und Reviewdatum: ____________________________________
Versions-/Revisionsnachweis: ____________________________________

Anbieter: ______________________________________________________
Anbieteranschrift/Kontakt: _____________________________________
Ausgestellt am: _________________________________________________
Unterschrift einer verantwortlichen Person: ______________________

Dies ist ausschließlich eine eigene Anbieter-Abschlussbescheinigung. Sie ist
kein staatlicher oder gesetzlich geregelter Abschluss, keine behördliche oder
berufliche Zulassung, kein Nachweis allgemeiner Rechts-, Datenschutz- oder
Sicherheitskonformität und kein Herstellerabschluss. Der Anbieter ist nicht als
gesetzlich anerkannte Zertifizierungsstelle anerkannt und darf diese Bescheinigung
nicht als gesetzliche Anerkennung oder Herstellerzertifizierung bewerben.
```

### Autor:innenbereich (nicht an Lernende ausliefern)

#### Reflexionsprüfung und Status

Die Reflexion erhält keine Punkte. Eine vollständige Antwort nennt zwei
vergleichbare Beobachtungswerte, eine konkrete Handlung nach sieben Tagen, eine
Reviewhandlung nach 30 Tagen und die Statusgrenze zwischen Teilnahme,
`completed` und `passed`. Eine unbelegte Zeitersparnis wird zurückgewiesen und
als Aussagegrenze markiert.

Die Teilnahmevorlage darf bei dokumentierter Teilnahme ausgegeben werden, auch
wenn die Abschlussprüfung nicht bestanden ist. Vorlage B darf nur mit einem
menschlich protokollierten `passed` aus Wissens- und Praxisprüfung ausgefüllt
werden. Kein Herstellername, Herstellerlogo oder Herstellerabschluss wird
ergänzt. Tatsächlicher Umfang und Version werden aus den vorhandenen
Bearbeitungsdaten übernommen und nicht geschätzt.
