# Kunden-Lernbereich

## Goal
`/customers` wird ein hochwertiger, übersichtlicher deutschsprachiger Lernbereich für KI-Schulungen. Zunächst werden ausschließlich klar erkennbare Platzhalterinhalte verwendet. Kunden finden ihren nächsten Lernschritt sofort und können Kurse und Lektionen nachvollziehbar durcharbeiten.

## Decisions
- Bestehenden SolidJS-/TanStack-/Tailwind-Stack und vorhandene Bibliotheken verwenden; keine neuen Abhängigkeiten oder Backend-Änderungen.
- Ruhige LMS-Struktur: Lernübersicht → Kurs mit Modulen → Lektion, mit eindeutigem Weiterlernen-Einstieg und sichtbarem Fortschritt.
- Individuelle, hochwertige Gestaltung mit klarer Typografie, wenigen Akzentfarben, großzügigen Abständen und responsiver Navigation statt überladener Kennzahlen.
- Platzhalterkurse zu KI-Grundlagen, Prompting und sicherer KI-Anwendung. Keine echten Schulungsinhalte, Videoangebote oder Zertifikate vortäuschen.
- Demo-Fortschritt startet leer, wird aus abgeschlossenen Lektionen berechnet und ausschließlich lokal gespeichert; diese Einschränkung wird knapp kenntlich gemacht.
- Authentifizierung und bestehende Kunden-/Dateifunktionen erhalten. Bisherige Kundenliste bei Bedarf unter `/customers/verwaltung` erreichbar halten; keine Migration bestehender Daten.
- Barrierearme Semantik, Tastaturbedienung, sichtbare Fokuszustände und Reduced-Motion berücksichtigen.

## Approach
Zuerst die Lernübersicht und konsistente Kursstruktur gestalten. Anschließend den funktionierenden Platzhalter-Lernflow mit Kursmodulen, Lektionsansicht und lokalem Fortschritt ergänzen. Abschließend Desktop und Mobilansicht sowie den vollständigen Lernflow im Browser prüfen.

## Tasks
1. [x] Lernübersicht: gemeinsames visuelles Layout, Navigation, statische Kurs-/Modul-/Lektionsdaten, Kursübersicht und Erhalt der bisherigen Verwaltung. Bestehende Bibliotheken und Code-Style beachten; Typecheck/Build prüfen.
2. [x] Lernflow: Lektionsansicht mit klar gekennzeichnetem Inhaltsplatzhalter, Orientierung innerhalb des Kurses, Abschließen/Weiterlernen und konsistentem lokalem Fortschritt. Relevante Logiktests sowie Typecheck/Build ausführen.
3. [x] Browserprüfung: authentifizierten Einstieg, Kurs-/Lektionsnavigation, Fortschritt nach Neuladen, Desktop-/Mobilansicht und Tastaturbedienung prüfen; nötige Korrekturen separat delegieren.
