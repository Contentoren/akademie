# Redaktions- und Betriebshandbuch

**Paket:** `ki-fuehrerschein`
**Geltungsstand:** Arbeitsgrundlage für `1.0.0-entwurf`
**Status:** Betriebsanweisung und Prüfvorlage, **keine Freigabe- oder Verkaufsentscheidung**

Dieses Handbuch beschreibt, wie das vorhandene Contentpaket fachlich gepflegt,
geprüft, pilotiert und in einer Lernumgebung betrieben werden kann. Es ersetzt
nicht den Inhalts- und Importvertrag in [`IMPLEMENTIERUNG.md`](../IMPLEMENTIERUNG.md).
Für Manifest, IDs, Markdown-Struktur, Interaktionstypen, Lernenden-/Autor:innen-
Trennung, Status und Barrierefreiheitsvertrag gilt ausschließlich die dortige
Fassung; insbesondere die Abschnitte 2–8 sind vor jeder technischen Umsetzung zu
prüfen. `README.md`, `kurs.json`, `quellen-rechte.md` und die beiden Prüfungsdateien
sind die zugehörigen Arbeitsquellen.

## 1. Betriebsgrenzen

- Das Paket bleibt toolneutral und ohne externes KI-Konto vollständig bearbeitbar.
  Die Simulation mit D01–D08 sowie P01–P04 ist der primäre und ausreichende
  Bearbeitungsweg. Eine Live-Simulation kann ein echtes Produkt später ergänzen,
  darf es aber nicht voraussetzen.
- Übungen enthalten ausschließlich bereitgestellte synthetische Daten. **Echte
  Kund:innen-, Beschäftigten-, Geheim- oder Zugangsdaten gehören nicht in
  Übungen, Pilotierung, Screenshots, Exporte oder Testkonten.**
- Das Paket verspricht keine Zertifizierung, Rechtskonformität,
  Datenschutzkonformität, berufliche Zulassung oder sichere Wirkung in jeder
  Umgebung. Teilnahme, Bearbeitung und ein menschlich entschiedener Abschluss
  sind getrennte Zustände.
- Ein System darf keinen Entwurf, keine Freigabe, kein Bestehen und kein
  Zertifikat automatisch als menschliche Entscheidung ausgeben.
- Es wird kein laufendes Historien-, Log- oder Blockertagebuch geführt. Für
  prüfbare Entscheidungen genügen die im Inhaltsvertrag und in den Vorlagen
  vorgesehenen Versions-, Status-, Rollen- und Bewertungsfelder.

## 2. Redaktioneller Arbeitsablauf

### 2.1 Quellen und Arbeitsreihenfolge

1. `kurs.json` laden und gegen die neun Module, 28 Lektionen, IDs, Lernziele,
   Dateipfade und Zeiten abgleichen.
2. `IMPLEMENTIERUNG.md` als technische Leitlinie anwenden. Kein neuer
   Inhaltsvertrag, kein eigener ID-Mechanismus und keine implizite
   Bewertungslogik werden in dieser Datei erfunden.
3. `materialien/musterunternehmen.md` als unverändertes synthetisches Szenario
   behandeln. D08 bleibt Autor:innen-/Reviewmaterial und wird nicht in den
   Lernendenbestand importiert.
4. Jede Lektion fachlich gegen ihre Manifestziele, Datenquellen und den
   wiederkehrenden Ablauf „Aufgabe wählen → Kontext bereitstellen → Ergebnis
   prüfen → verantwortlich freigeben“ prüfen.
5. Prüfungsdateien getrennt prüfen: Wissen gegen den Schlüssel in
   `pruefung/wissenspruefung.json`, Praxis gegen Auftrag und Rubrik in
   `pruefung/praxispruefung.md`.
6. Erst danach Lernendenexport, Tastaturbedienung, Statusansagen und die Trennung
   des Autor:innenbereichs technisch abnehmen.

### 2.2 Fachredaktion je Änderung

Die redaktionell verantwortliche Person legt für jede inhaltliche Änderung
mindestens folgende Angaben fest: betroffene Datei und ID, Anlass, betroffene
Lernziele, Quellen-IDs, Sicherheits-/Rechtsauswirkung, Version der betroffenen
Inhaltsschicht und erforderliche menschliche Reviews.

- Eine Umformulierung behält die bestehende ID.
- Ein fachlich neues oder ersetzendes Element erhält eine neue ID; die alte ID
  wird nicht wiederverwendet.
- Änderungen an Minuten, IDs, Bewertungsgrenzen oder Sicherheitsgrenzen erfordern
  einen Versionssprung und den vollständigen passenden Prüflauf.
- Behauptungen mit Rechts-, Steuer-, Datenschutz- oder Sicherheitsbezug werden
  als Orientierung mit Aussagegrenze formuliert. Sie werden nicht aus den
  synthetischen Unternehmensdaten abgeleitet.
- Jede Lektion muss Lerntext, Aufgabe, Quellen und den klar getrennten
  Autor:innenbereich nach `IMPLEMENTIERUNG.md` enthalten. Lösungen und
  Feedback dürfen vor der Antwort nicht an Lernende gelangen.

### 2.3 Fachlicher Review

Der Fachreview prüft nicht nur Sprache, sondern die fachliche Entscheidungskette:

- Stimmen Quellen-ID, Status, Datum/Version und Aussageumfang überein?
- Werden Wunsch, Zielwert, Tatsache, Annahme, unbekannter Punkt und Freigabe
  sichtbar getrennt?
- Sind Zahlen, Einheiten, Rundungen, Quellen- und Rollenbezüge unabhängig
  nachprüfbar?
- Wird D06 ausschließlich als `untrusted content` behandelt und D08 nicht an
  Lernende ausgeliefert?
- Sind Praxisrubrik, kritische Fehler und Feedback konsistent mit der
  verbindlichen Prüfung in `kurs.json` und `IMPLEMENTIERUNG.md`?
- Bleibt die Simulation ohne Produktkonto und ohne echte Daten lösbar?

Abweichungen werden in der betroffenen Datei mit präziser Korrektur behoben; es
wird keine fachliche Antwort automatisch durch einen Importer repariert.

## 3. Planwerte und Pilot

### 3.1 Kurszeit als Planwert

Die folgenden 390 Minuten sind Manifest- und Planwerte. Sie sind **keine bereits
gemessene Bearbeitungsdauer** und keine Zusage, dass jede Person genau so lange
benötigt.

| Abschnitt | Manifest-ID | Planwert |
|---|---|---:|
| Startcheck | `m0` | 15 min |
| KI sinnvoll einsetzen | `m1` | 35 min |
| Sicher loslegen | `m2` | 40 min |
| Klar beauftragen | `m3` | 45 min |
| Büro-Praxislabor | `m4` | 60 min |
| Fehlerwerkstatt | `m5` | 45 min |
| Verantwortung | `m6` | 35 min |
| Assistenz und Workflows | `m7` | 45 min |
| Fahrprüfung | `m8` | 70 min |
| **Summe** |  | **390 min Planwert** |

Für Planung und Import wird die Summe aus `kurs.json` verwendet. Im Pilot werden
zusätzliche beobachtete Zeiten separat erfasst; sie verändern weder Manifest noch
Planwert ohne den dafür vorgeschriebenen Versions- und Reviewprozess.

### 3.2 Drei Schlüssellektionen für einen kleinen Pilot

Der Pilot konzentriert sich auf genau diese drei vorhandenen Lektionen:

| Schlüssel | Lektion | Zweck der Beobachtung |
|---|---|---|
| `m2-l3` | Sicher vor der ersten Eingabe | Erkennt die Person Fakten, Annahmen, Verbote und Rückfragen und bildet ein minimiertes Eingabepaket? |
| `m3-l2` | Quellen, Format und Kriterien | Formuliert die Person einen guten, quellengebundenen und prüfbaren Auftrag? |
| `m5-l2` | Zahlen unabhängig prüfen | Rechnet die Person Zahlen, Einheiten und Kontrollwerte unabhängig nach und trennt Rechen- von Darstellungsfehlern? |

Die Auswahl ist ein operativer Frühcheck für Sicherheitsgrenze, Auftragsqualität
und Fehlerprüfung. Sie ist keine verkürzte Abschlussprüfung und ersetzt keine
Abnahme aller 28 Lektionen.

### 3.3 Geeignete Pilotgruppe und Durchführung

Vorgeschlagen wird eine kleine Gruppe von **5 bis 8 Personen** aus Büro- oder
Wissensarbeit, möglichst mit unterschiedlichen KI-Vorerfahrungen und mindestens
zwei typischen Aufgabenprofilen. Nicht alle Personen sollten derselben direkten
Führungskraft unterstehen. Barrierebedarfe dürfen freiwillig benannt werden und
sind für die passende Durchführung zu berücksichtigen; sie werden nicht als
Leistungsmerkmal bewertet.

Durchführung:

1. Vorab erklären: synthetische Daten, keine echten Kundendaten, kein externer
   Account erforderlich, Beobachtung dient der Inhaltsverbesserung.
2. Die drei Lektionen in Manifestreihenfolge bearbeiten lassen. Hinweise nur
   geben, wenn sie für Barrierefreiheit oder die technische Bedienung nötig sind;
   fachliche Hilfe als Beobachtung notieren, nicht als stillen Lösungshinweis.
3. Pro Lektion die einmalige Beobachtungsvorlage unten ausfüllen. Aktive Lernzeit
   ist eine Beobachtung mit Timer, keine automatisch aus Systemlogs abgeleitete
   Kennzahl.
4. Danach nur kurze Rückfrage zu Verständlichkeit und Barrieren stellen. Keine
   Forschungsaussage, Repräsentativitätsbehauptung oder Wirksamkeitsgarantie aus
   der kleinen Gruppe ableiten.
5. Befunde nach Schwere sortieren: Sicherheits-/Prüfungsrisiko zuerst,
   Verständlichkeit danach, kosmetische Punkte zuletzt. Änderungen anschließend
   erneut fachlich und technisch reviewen.

#### Kopierbare Beobachtungsvorlage

```text
PILOTBEOBACHTUNG – drei Schlüssellektionen
Kursversion: __________________  Datum: ________________
Beobachtete Pilot-ID (pseudonym): ______________________
Rolle/Erfahrung nur grob, keine sensiblen Angaben: __________________________
Beobachtende Person: __________________  Einwilligung/Info erfolgt: [ ] ja

LEKTION 1: m2-l3 – Sicher vor der ersten Eingabe
Aufgabenverständnis (0 = unklar, 1 = teilweise, 2 = sicher): ____
Aktive Lernzeit, manuell beobachtet: ______ min   Unterbrechungen: ______
Fehler/Befunde (ID oder kurze Beschreibung, keine echten Daten):
___________________________________________________________________________
Nacharbeit benötigt? [ ] nein  [ ] ja, fachlich  [ ] ja, Bedienung
Nacharbeit/benötigte Hilfe: ________________________________________________
Barriere oder Verständnishürde: ____________________________________________

LEKTION 2: m3-l2 – Quellen, Format und Kriterien
Aufgabenverständnis (0 = unklar, 1 = teilweise, 2 = sicher): ____
Aktive Lernzeit, manuell beobachtet: ______ min   Unterbrechungen: ______
Fehler/Befunde (ID oder kurze Beschreibung, keine echten Daten):
___________________________________________________________________________
Nacharbeit benötigt? [ ] nein  [ ] ja, fachlich  [ ] ja, Bedienung
Nacharbeit/benötigte Hilfe: ________________________________________________
Barriere oder Verständnishürde: ____________________________________________

LEKTION 3: m5-l2 – Zahlen unabhängig prüfen
Aufgabenverständnis (0 = unklar, 1 = teilweise, 2 = sicher): ____
Aktive Lernzeit, manuell beobachtet: ______ min   Unterbrechungen: ______
Fehler/Befunde (ID oder kurze Beschreibung, keine echten Daten):
___________________________________________________________________________
Nacharbeit benötigt? [ ] nein  [ ] ja, fachlich  [ ] ja, Bedienung
Nacharbeit/benötigte Hilfe: ________________________________________________
Barriere oder Verständnishürde: ____________________________________________

Übergreifende Beobachtung
Was wurde ohne Hilfe verstanden? ___________________________________________
Welche Formulierung, Interaktion oder Aufgabe war missverständlich? __________
Welche Barriere trat auf (Tastatur, Text, Kontrast/Farbe, Status, Zeit, anderes)?
___________________________________________________________________________
Konkrete redaktionelle/technische Maßnahme: _________________________________
Keine Wirksamkeits- oder Forschungsgarantie aus diesem Blatt ableiten: [ ]
```

## 4. Versionierung und getrennte Inhaltsschichten

Die folgenden Schichten werden unabhängig gepflegt und in jedem Review benannt:

| Schicht | Inhalt | Änderungsbeispiel | Mindestreview |
|---|---|---|---|
| **Grundlagentext** | Methodik, Lerntexte, synthetische Materialien, Aufgaben und allgemeine Quellenhinweise | neue Erklärung, neue D-ID oder Änderung an einem Lernziel | redaktionell + fachlich; bei betroffenen IDs technisch |
| **Rechtslektion** | insbesondere `m6-l1` und die dazugehörigen Rechtsorientierungen/Referenzen | Aktualisierung einer Rechtslage, Aussagegrenze oder Rechtsquelle | Fachreview und aktuelle fachjuristische Prüfung durch Menschen |
| **Produktdemos** | optionale Demonstrationen eines konkreten Produkts | Hersteller-, UI-, Konten- oder Funktionsänderung | Rechte-, Aktualitäts- und technischer Review |

Für die aktuelle Lieferung gilt: **Es sind keine Produktdemos produziert und keine
Produktdemos zum Lernen erforderlich.** Die Live-/Offline-Simulation reicht aus.
Eine spätere Demo erhält eine eigene Version und darf weder Lernziel noch
Prüfung ohne gesonderte Prüfung verändern.

Beispiel für die redaktionelle Änderungsangabe (kein neues Dateiformat):

```text
Grundlagentext: 1.0.0-entwurf
Rechtslektion: 1.0.0-entwurf
Produktdemos: keine
Betroffene IDs/Dateien: _________________________________________________
Änderungsgrund: _________________________________________________________
Erforderliche Reviews: __________________________________________________
```

Eine veröffentlichte Kursversion darf nur auf einen Stand zeigen, dessen drei
Schichten und betroffene Prüfungsentscheidungen eindeutig zugeordnet sind.

## 5. Rollen und Zuständigkeiten

Die folgenden Rollen müssen vor einer echten Veröffentlichung durch Menschen mit
Namen oder Organisationsrollen besetzt werden. Eine Person kann mehrere Rollen
übernehmen, darf aber die eigene Prüfentscheidung nicht als unabhängige
Zweitprüfung ausgeben.

- **Redaktioneller Owner:** hält Inhaltsumfang, IDs, Ziele, Versionen und
  Änderungsentscheidung zusammen; beantragt keine rechtliche Freigabe im Namen
  der Fachstelle.
- **Fachreview:** prüft fachliche Richtigkeit, Quellen, Status, Rechenwege,
  Sicherheitsgrenzen und die Passung zur Zielgruppe.
- **Prüfer:in:** bewertet Praxis menschlich nach `a0`–`a4`, entscheidet die
  Kritikalität und gibt begründetes Feedback; bewertet nicht automatisch durch
  ein KI-System.
- **Technische Umsetzung:** importiert nach `IMPLEMENTIERUNG.md`, trennt
  Lernenden-/Autor:innenbestand, setzt Interaktionen zugänglich um und weist
  technische Befunde an die Redaktion zurück. Diese Rolle trifft keine
  fachliche oder rechtliche Inhaltsentscheidung.
- **Noch zu benennende fachjuristische bzw. betriebliche Stelle:** erledigt die
  aktuellen Rechts-, FernUSG-/ZFU-, Vertragsmodell-, Rechte- und
  Veröffentlichungsprüfungen. Diese Stelle ist im Quellenregister noch offen.

### Kopierbare Rollen-Kompetenzmatrix

```text
ROLLEN-KOMPETENZMATRIX – auszufüllen, nicht als Freigabe verwenden
Organisation: __________________________  Paketversion: _________________

Rolle | Name/Team | Fachkompetenz/Nachweis | darf entscheiden | darf nur zuarbeiten | Stellvertretung
----- | --------- | ---------------------- | ---------------- | ------------------- | --------------
Redaktioneller Owner | | | | |
Fachreview | | | | |
Prüfer:in | | | | |
Technische Umsetzung | | | | |
Fachjuristische Stelle | | | | |
Betriebs-/Datenschutzstelle | | | | |

Unabhängigkeit der Prüfung geklärt: [ ] ja [ ] nein
Konflikt oder fehlende Kompetenz: __________________________________________
Benennende verantwortliche Person: __________________ Datum: ______________
```

## 6. Veröffentlichungs- und Betriebsprüfungen

Die folgenden Kriterien sind **noch durch Menschen zu erfüllen**. Offene Felder
sind kein stillschweigendes „bestanden“ und dieser Abschnitt enthält keinen
Freigabeclaim.

### 6.1 Veröffentlichungsgate

```text
VERÖFFENTLICHUNGSCHECK – Ergebnis offen bis zur menschlichen Entscheidung
Paket/Kursversion: __________________  Prüftermin: _________________________
Redaktioneller Owner: ______________________________________________________

[ ] Fachliche Prüfung aller Module, Quellen, Rechenwege und Lernziele erledigt
    Beleg/Version: _________________________________________________________
[ ] Aktuelle Rechtsprüfung durch zuständige Fachperson erledigt
    Geltungsstand, Grenzen und offene Punkte: _______________________________
[ ] Konkreter FernUSG-/ZFU-Check des tatsächlichen Angebots erledigt: Preis,
    Vertragsmodell, räumliche Trennung, Lernerfolgskontrolle, Betreuungs- und
    Prüfmodell sowie konkrete Leistung wurden betrachtet.
    Fachliche Stellungnahme/Datum: _________________________________________
[ ] Vertragsmodell und Außendarstellung auf widerspruchsfreie Aussagen geprüft
    Zuständige Stelle/Ergebnis: ____________________________________________
[ ] Rechteprüfung gemäß quellen-rechte.md erledigt; Fremdmaterial, Bearbeitung,
    Attribution und Lizenz sind je Ausnahme konkret dokumentiert.
    Registereintrag/Ergebnis: ______________________________________________
[ ] Barrierearme technische Umsetzung gegen Abschnitt 7 dieses Handbuchs und
    IMPLEMENTIERUNG.md praktisch getestet.
    Testfälle/Version: _____________________________________________________
[ ] Autor:innenbereich, D08, Wissensschlüssel und Praxisreferenzlösung sind aus
    dem öffentlichen Lernendenexport entfernt.
[ ] Keine Produktdemo ist erforderlich; falls vorhanden, separat geprüft.
[ ] Außentext behauptet weder Zertifizierung noch Rechtskonformität noch
    automatische KI-Entscheidung.

Offene menschliche Entscheidung: ___________________________________________
Entscheidung (noch nicht vorwegnehmen): [ ] offen [ ] zurück an Redaktion
[ ] nach vollständigem Review freigeben
Entscheidende Person: __________________  Datum: __________  Version: ______
```

### 6.2 Konkrete fachliche und rechtliche Prüfpunkte

- Der Fachreview arbeitet mit `quellen-rechte.md` und den dort aufgeführten
  Referenzen R1–R10. Quellenstand und Formulierung werden vor dem vorgesehenen
  Veröffentlichungsdatum erneut bewertet; eine Quellenliste ist keine
  Nutzungs- oder Rechtsfreigabe.
- Die aktuelle Rechtsprüfung muss die Rechtslektion, ihre Aussagegrenzen und
  die konkrete Außenkommunikation prüfen. Eine allgemeine Orientierung wird
  nicht als Einzelfallberatung oder gesetzliche Erfüllung ausgegeben.
- Der FernUSG-/ZFU-Check muss das **konkrete** entgeltliche Vertrags- und
  Betreuungsmodell untersuchen, einschließlich räumlicher Trennung,
  Lernerfolgskontrolle, individueller Praxisbewertung, Vertragstexten und
  tatsächlicher Durchführung. Aus R6–R8 wird hier keine pauschale
  Zulassungsfreiheit oder Zulassungspflicht abgeleitet.
- Der Rechtecheck prüft Eigenständigkeit, eventuelle Bearbeitungen und jedes
  später hinzugefügte Asset separat. Der aktuelle Registerstand dokumentiert
  keine übernommenen Fremdassets; das ist keine pauschale Lizenzbehauptung.

### 6.3 Review-Anlässe und Intervalle – Vorschläge, nicht eingerichtet

Die folgenden Takte sind betriebliche Vorschläge. Sie sind nicht eingerichtet,
kein bestehender Service und keine Zusage:

| Anlass | Vorgeschlagener Zeitpunkt | Menschliche Aktion |
|---|---|---|
| Vor jeder Erstveröffentlichung oder Kursversion | vollständig vor Veröffentlichung | alle Gates in 6.1, Import- und Barriereprüfung |
| Rechts-, Vertrags-, Behörden- oder Quellenänderung | anlassbezogen vor erneuter Nutzung | Rechtslektion, Außentext, FernUSG/ZFU und Vertragsmodell neu prüfen |
| Änderung an Lernziel, Sicherheitsgrenze, Prüfregel oder D-ID | vor Merge/Import | Fachreview, Prüfschlüssel-/Rubrikabgleich, Versionssprung |
| technische Plattform-, Browser- oder Assistenzänderung | vor Bereitstellung der betroffenen Version | Lernendenexport, Tastatur, Ansagen, Autor:innen-Trennung testen |
| Sicherheits-, Rechte-, Barriere- oder Bewertungsbefund | sofort vor weiterer betroffener Nutzung | Nutzung stoppen oder begrenzen, Korrektur und menschliche Entscheidung |
| regulärer Pflegecheck | Vorschlag: halbjährlich | Quellenstand, Rechtslektion, Rechte und Kontaktrollen prüfen |
| neue Produktdemo, falls jemals ergänzt | vor jeder Veröffentlichung und bei relevanter UI-/Funktionsänderung | Demo separat versionieren und auf Lernnotwendigkeit prüfen |

Die Organisation muss diese Vorschläge erst beschließen, Rollen benennen und in
ihre vorhandene Betriebssteuerung übernehmen. Dieses Dokument legt keinen
automatischen Terminplan und kein Blockertagebuch an.

## 7. Barrierearme technische Umsetzung

Die technische Rolle weist die Umsetzung anhand echter Tastatur- und
Screenreader-/Texttests nach; sie darf nicht nur Quelltextprüfungen abhaken.

- **Tastatur:** alle Links, Auswahlfelder, Textfelder, Buttons, Navigation,
  Auf-/Ab-Steuerungen und Abgabeaktionen sind ohne Maus erreichbar; Fokus ist
  sichtbar und folgt der visuellen Reihenfolge.
- **Textalternativen:** jede Information aus Farbe, Icon, Bild, Diagramm oder
  Simulation erhält verständlichen Text. Tabellen nennen Kopfzellen, Einheiten
  und bei Zahlen eine textliche Erklärung, soweit erforderlich.
- **Kein Color-only:** richtig/falsch, Status, Risiko, Pflicht und Fehler werden
  zusätzlich durch Text, Symbol mit Beschriftung oder semantischen Status
  vermittelt.
- **Statusansage:** Speichern, Abgabe, Fehler, Feedback, Reviewstatus und
  Versionsänderung werden sichtbar und programmatisch angekündigt; der Fokus
  springt nicht unerwartet.
- **Feedback:** nach einer Antwort wird verständliches Feedback mit nächstem
  sicheren Schritt angezeigt. Lösungsschlüssel und vollständige Referenzlösung
  erscheinen erst nach der zulässigen Antwort-/Reviewgrenze und nie im
  Lernendenquelltext.
- **Aufgabensteuerung:** `order` hat die im Inhaltsvertrag verlangte
  tastaturbedienbare Alternative zu Drag-and-drop. Formularfehler sind dem
  jeweiligen Feld zugeordnet.
- **Prüfungsgrenze:** Freitext und Praxis werden menschlich bewertet. Eine KI
  darf weder automatisch die Prüfentscheidung noch ein Zertifikat erzeugen.

### Kopierbare technische Abnahme

```text
TECHNISCHE ABNAHME – Kursversion: __________________  Testdatum: __________
Testumgebung/Browser/Assistenz: ____________________________________________

[ ] Pflicht-Sicherheitscheck kann nicht durch direkte Navigation umgangen werden
[ ] Alle interaktiven Elemente vollständig per Tastatur bedienbar
[ ] Sichtbarer Fokus und keine verdeckten Fokusziele
[ ] Textalternative für jede nicht-textliche oder farbcodierte Information
[ ] Kein Status und keine Korrektur nur über Farbe vermittelt
[ ] Speichern, Abgabe, Feedback und Status programmatisch angesagt
[ ] Fehler dem Feld zugeordnet; Fokus nicht unerwartet verschoben
[ ] order-Aufgabe ohne Drag-and-drop bedienbar
[ ] Feedback erst nach Antwort; Lösungsschlüssel nicht im Lernendenexport
[ ] Autor:innenbereich, D08 und Prüfungsreferenzlösung nicht öffentlich
[ ] Praxis/Freitext als menschliche Bewertung markiert
[ ] Keine automatische Bestanden-/Zertifikatsentscheidung

Befund/Datei/ID: ___________________________________________________________
Technische Umsetzung: __________________  Gegenprüfung: ___________________
Status: [ ] offen [ ] nachgebessert [ ] für menschliche Freigabe vorgelegt
```

## 8. Prüfungsbetrieb und revisionsfähige Entscheidungen

### 8.1 Exakte Abschlussregel

Der Abschluss ist nur bestanden, wenn **beide** Bedingungen erfüllt sind:

1. Wissensprüfung `m8-l1`: 20 Multiple-Choice-Fragen, je 1 Punkt, exakt
   geforderte Auswahlmenge, mindestens **16/20**.
2. Praxisprüfung `m8-l2`: `a0`–`a4`, je 0–4 Punkte, mindestens **16/20** und
   **kein ungelöster kritischer Daten- oder Freigabefehler**.

Die Praxis wird menschlich bewertet. Reflexion `m8-l3` dauert 10 Minuten und ist
nicht benotet. Teilnahme, `completed` und `passed` bleiben getrennt. Die Regeln
stammen aus `kurs.json`, `pruefung/wissenspruefung.json` und
`IMPLEMENTIERUNG.md` und dürfen hier nicht abweichend ausgelegt werden.

### 8.2 Ablauf

1. Vor dem Versuch wird die Kurs- und Prüfungsversion festgehalten; Lernende
   erhalten nur die Learner-Projektion.
2. Wissensversuch auswerten: exakt richtige Optionsmenge, keine Teilpunkte,
   keine Minuspunkte, maximal drei Versuche.
3. Unter 16/20 darf die Person innerhalb der drei Versuche erneut antreten.
   Nach dem dritten Versuch entscheidet eine menschliche Stelle über Review oder
   Reset. Es gibt keine automatische Freigabe.
4. Praxisabgabe entgegennehmen und von einer menschlichen Prüferin/einem
   menschlichen Prüfer anhand der fünf Kriterien bewerten. Kritische Befunde
   werden einzeln als `nicht vorhanden`, `gelöst` oder `ungelöst` markiert.
5. Nur wenn Wissensgrenze, Praxisgrenze und Kritikalitätsprüfung positiv sind,
   darf ein Mensch `passed` setzen. Andernfalls bleibt der Abschluss nicht
   bestanden oder zur menschlichen Klärung offen.
6. Bei Praxisrevision bleiben Original, Feedback, Revision, neue Punkte und
   neue Kritikalitätsentscheidung als getrennte Versionen erhalten. Die alte
   Entscheidung wird nicht still überschrieben.

### 8.3 Konsistente Bewertungsprobe mit zwei Prüfer:innen

Als betrieblicher Vorschlag werden mindestens **zwei unabhängige Doppelbewertungen
pro Pilot- oder Prüfungsrunde** und zusätzlich 20 % der weiteren Praxisabgaben
empfohlen. Der konkrete Umfang ist noch zu beschließen. Beide Prüfer:innen
bewerten zunächst getrennt mit Fundstellen für `a0`–`a4` und der
Kritikalitätsentscheidung. Danach werden Unterschiede je Kriterium fachlich
besprochen und als begründete Konsensentscheidung versioniert; eine Punktzahl
wird nicht still angepasst. Die Doppelbewertung prüft die Bewertungsprobe, nicht
die automatische Entscheidung durch ein Modell.

### 8.4 Korrekturverfahren

- Die lernende Person erhält konkrete Fundstelle, Kriterium, Fehlerbild,
  sicheren nächsten Schritt und zulässige Revision.
- Eine Revision erhält eine neue Abgabeversion und einen Änderungsgrund; die
  Originalabgabe bleibt lesbar.
- Ändert die Revision die Bestehens- oder Kritikalitätsentscheidung, prüft eine
  zweite menschliche Person die geänderte Entscheidung nach Möglichkeit.
- Nach dem dritten Wissensversuch ist nur menschlicher Review oder Reset möglich;
  die Entscheidung wird mit Grund, zuständiger Rolle, Kursversion und neuem
  Status erfasst.
- Korrekturen an Prüfungsfragen, Schlüssel, Rubrik oder kritischen Fehlern
  werden als Inhaltsänderung behandelt und vor weiterer Nutzung fachlich sowie
  technisch geprüft.

### Kopierbare Prüfentscheidungs-Vorlage

```text
PRÜFUNGSENTSCHEIDUNG – keine automatische Zertifikatsentscheidung
Lernenden-ID (pseudonym): __________________  Kursversion: ________________
Wissensprüfungsversion: _____________________  Praxisversion: ______________

WISSEN
Versuch: [ ] 1 [ ] 2 [ ] 3    Punkte: ____ / 20    bestanden: [ ] ja [ ] nein
Exakte Auswahlregel angewendet: [ ] ja
Nach drittem Versuch: [ ] nicht zutreffend [ ] menschlicher Review [ ] Reset
Grund/Entscheidung: _______________________________________________________

PRAXIS – menschliche Bewertung
Kriterium | Punkte 0–4 | Fundstelle in Abgabe | Begründung
a0         |            |                    |
a1         |            |                    |
a2         |            |                    |
a3         |            |                    |
a4         |            |                    |
Summe: ____ / 20   Praxisgrenze erreicht: [ ] ja [ ] nein

Kritischer Befund: [ ] keiner [ ] vorhanden, gelöst [ ] vorhanden, ungelöst
Beleg und Schutzentscheidung: ______________________________________________
Praxisentscheidung: [ ] bestanden [ ] nicht bestanden [ ] Klärung erforderlich

GESAMT
Wissen mindestens 16/20: [ ] ja [ ] nein
Praxis mindestens 16/20: [ ] ja [ ] nein
Kein ungelöster kritischer Fehler: [ ] ja [ ] nein
Gesamtstatus: [ ] completed [ ] needs-human-review [ ] revised [ ] passed
Entscheidende Prüfer:in: __________________ Datum: _________________________
Zweitprüfung/Abweichung: __________________________________________________
Feedbackversion und Abgabeversion: _________________________________________
```

## 9. Firmenpaket: ausfüllbare Betriebsbausteine

Die folgenden Bausteine können von einem Unternehmen kopiert und ausgefüllt
werden. Sie legen keine tatsächliche Zuständigkeit, Datenaufbewahrung oder
Freigabe vorweg.

### 9.1 Freigabewerkzeug für einzelne Lerninhalte

```text
INHALTS-FREIGABEWERKZEUG
Datei/ID: __________________________  Schicht: [ ] Grundlage [ ] Recht [ ] Demo
Änderungsversion: ___________________  Anlass: ______________________________

[ ] Manifest-ID, Titel, Dauer und Lernziel stimmen
[ ] Lerntext erklärt Sachverhalt und Grenze eigenständig
[ ] Aufgabe, Option-/Knoten-IDs und Autor:innenbereich stimmen
[ ] Quellen/D-IDs und Status sind korrekt
[ ] Lösung/Feedback ist nicht vor Antwort sichtbar
[ ] Sicherheits-, Daten- und Freigabegrenzen sind korrekt
[ ] Barriereanforderungen praktisch geprüft
[ ] Rechte-/Attributionsbedarf im Register geprüft

Fachreview-Beleg: __________________________________________________________
Redaktioneller Owner: __________________  Datum: ___________________________
Technische Umsetzung geprüft von: ______ Datum: ___________________________
Entscheid: [ ] offen [ ] ändern [ ] für Gesamtgate vorgelegt
```

### 9.2 Datenklassen und Übungsgrenzen

```text
DATENKLASSENBLATT – betriebliche Festlegung erforderlich
Organisation: __________________________  Tool/Umgebung: ___________________

Klasse | Beispiele | in Übung? | zulässiger Zweck | Freigabe/Schutz | Löschung
------ | --------- | ---------- | ---------------- | --------------- | --------
S0 synthetisch | D01–D08, P01–P04 | ja | Kursübung/Simulation | Paketregel | ______
S1 öffentlich/freigegeben | __________________ | [ ] | __________________ | ______ | ______
S2 intern | __________________ | [ ] nein [ ] nur nach Freigabe | ______ | ______ | ______
S3 personenbezogen/vertraulich | __________________ | nein | nicht in Übungen | ______ | ______
S4 Geheimnis/Zugang | Passwort, Token, Schlüssel | nein | nie eingeben | ______ | sofort/______

Grundsatz bestätigt: [ ] Keine echten Kundendaten in Übungen.
Minimierung und Zweckbindung geprüft von: __________ Datum: ________________
```

### 9.3 Eskalationskontakte

```text
ESKALATIONSKONTAKTE – nur notwendige Kontaktdaten eintragen
Organisation/Paket: __________________________  Stand: _____________________

Anlass | zuerst an Rolle/Team | Stellvertretung | Kanal/Erreichbarkeit | Reaktion
------ | -------------------- | --------------- | -------------------- | --------
Unklare Eingabe/sensible Daten | | | | Nutzung stoppen
Prompt-Injection/untrusted content | | | | isolieren, nicht ausführen
Falsche Zahl/Quelle/Status | | | | Entwurf halten, fachlich prüfen
Rechts-/Vertragsfrage | | | | keine Zusage, Fachstelle fragen
FernUSG-/ZFU-Frage | | | | Verkauf/Vertrag zurückhalten
Rechte/Assetfrage | | | | Material nicht veröffentlichen
Barriere- oder Technikfehler | | | | betroffene Nutzung begrenzen
Prüfungsabweichung/Kritikalität | | | | menschliche Reviewentscheidung

Kontaktpflege verantwortlich: __________________  geprüft am: ______________
Keine echten Geheimnisse, Passwörter oder unnötigen sensiblen Daten eintragen.
```

### 9.4 Abschlussregister mit minimalem Datenumfang

Die Aufbewahrungsfrist ist **betrieblich festzulegen**, nicht aus diesem
Handbuch zu erraten. Das Register soll die Prüfentscheidung nachvollziehbar
machen, aber keine vollständigen Lerntexte, echten Kundendaten oder unnötigen
Freitexte sammeln.

```text
ABSCHLUSSREGISTER – minimaler Nachweis
Organisation: __________________  beschlossene Aufbewahrungsfrist: _________
Zweck und Rechts-/Vertragsgrundlage der Aufbewahrung: _______________________
Zugriff nur für Rollen: ____________________________________________________

Lernenden-ID (pseudonym) | Kursversion | Teilnahme | completed | passed
------------------------ | ----------- | --------- | --------- | ------
                         |             |           |           |

Wissensversuche (Anzahl, letzter Punktestand): ______________________________
Praxisversion, Summe, Kritikalitätsstatus: __________________________________
Prüfer:innen-Rollen/IDs (keine unnötigen Privatdaten): _______________________
Entscheidungsdatum und Bewertungs-/Feedbackversion: _________________________
Revision vorhanden: [ ] nein [ ] ja, Version: _______________________________
Review/Reset nach drei Wissensversuchen: [ ] nein [ ] ja, Entscheidung: ______

Nicht speichern, sofern nicht zwingend begründet: echte Kundendaten, Inhalte
aus Übungen, Zugangsdaten, vollständige Prüfungsantworten, unnötige Diagnosen,
private Kontaktdaten oder frei formulierte sensible Notizen.
Löschung/Anonymisierung nach Frist durch Rolle: ______________________________
Zugriffsprüfung und verantwortliche Stelle: __________________________________
```

## 10. Verifikation dieses Handbuchs

Vor Übergabe an Redaktion oder Technik werden mindestens diese internen
Verweise und Regeln geprüft:

- `../README.md` nennt die Datei, die vier Kursaktionen, die Planwerte und die
  Trennung von Teilnahme und Abschluss.
- `../kurs.json` bestätigt `m2-l3`, `m3-l2`, `m5-l2`, die 390 Minuten, die
  Wissensgrenze 16/20, maximal drei Versuche, Praxis `a0`–`a4`, 16/20,
  menschliche Bewertung und die Kritikalitätssperre.
- `../IMPLEMENTIERUNG.md` §§ 2–8 bestätigen IDs, Lernenden-/Autor:innen-
  Trennung, erlaubte Interaktionen, Tastatur-/Screenreader-Regeln, Status und
  exakte Prüfungsvereinbarung.
- `../quellen-rechte.md` §§ 1–4 bestätigen den offenen redaktionellen Owner,
  offene fachjuristische und konkrete FernUSG-/ZFU-Prüfung, Rechte-Gate,
  Quellenstand und den fehlenden Freigabeclaim.
- `../pruefung/wissenspruefung.json` bestätigt 20 Fragen, je 1 Punkt, exakte
  Auswahl, 16/20, drei Versuche, Review/Reset und serverseitigen Schlüssel.
- `../pruefung/praxispruefung.md` bestätigt 35 Minuten, P01–P04, sechs
  Abgabeabschnitte, `a0`–`a4`, 16/20, kritische Fehler, menschliche Revision und
  die getrennte Status-/Zertifikatsgrenze.

Der letzte Satz ist eine Prüfliste, kein automatischer Freigabemechanismus.
