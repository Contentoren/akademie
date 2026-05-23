# Kundenfortschritt

TanStack-Start-App für Kundenprofile, editierbare Textdateien und Fortschrittsanzeige. Convex ist die einzige Persistenz; es gibt keine parallele Datenhaltung.

## Tech Stack

- TanStack Start mit TanStack Router und TypeScript
- Convex für Kundenprofile, Textdateien und Fortschritt
- Tailwind CSS v4
- Vite als Build-Tool
- Bun als Package Manager und Runtime
- Systemd User Service für lokale Preview-Infrastruktur

## Installation

```bash
bun install
cp .env.example .env
bun run convex:dev
```

`convex dev` erzeugt die Werte für `CONVEX_DEPLOYMENT` und `VITE_CONVEX_URL`. Ohne `VITE_CONVEX_URL` zeigt die App eine Setup-Meldung statt der Datenoberfläche.

## Entwicklung

```bash
bun run dev
```

Die App läuft lokal auf `http://localhost:3120`.

## Convex

Schema und Funktionen liegen unter `convex/`:

- `convex/schema.ts`: Tabellen `customers`, `textFiles`, `progress`
- `convex/customers.ts`: Kundenprofile laden, erstellen, bearbeiten, löschen
- `convex/textFiles.ts`: Textdateien laden, erstellen, bearbeiten, löschen
- `convex/progress.ts`: Fortschrittspunkte verwalten
- `convex/dashboard.ts`: einfache Übersichtszahlen

Convex lokal starten:

```bash
bun run convex:dev
```

Convex deployen:

```bash
bun run convex:deploy
```

## Checks

```bash
bun run typecheck
bun test
bun run build
```

## Systemd User Service

Der lokale Preview-Service liegt unter `ops/akademie.service`. Er baut die App und startet anschließend `vite preview` auf `127.0.0.1:3120`, damit die Vorschau nur über den lokalen Reverse Proxy erreichbar ist.

Installation:

```bash
bun run preview:install
```

Neustart:

```bash
bun run preview:restart
```

Logs prüfen:

```bash
journalctl --user -u akademie -f
```

## Docker Compose

Docker Compose startet nur die Vite-App. Convex läuft separat über `bun run convex:dev` oder über ein verbundenes Convex-Deployment:

```bash
docker compose up
```

## Deployment-Hinweise

- `.env` nicht committen.
- `VITE_CONVEX_URL` pro Umgebung setzen.
- Convex-Funktionen mit `bun run convex:deploy` deployen.
- Danach `bun run build` und `bun run start` verwenden.

## Funktionen

- Landingpage mit Convex-Übersicht
- Kundenliste mit Profilanlage
- Kundenprofil mit Name, E-Mail, Firma und Notizen
- Textdateien pro Kunde mit Typ `profile`, `progress`, `note` oder `test`
- Textdatei-Editor für freie Inhalte
- Fortschrittspunkte pro Kunde mit Status `open`, `in_progress`, `done`
- Fortschrittsanzeige pro Kunde
