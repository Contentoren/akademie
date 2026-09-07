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
bun run backend:deploy:development
bun run convex:dev
```

Die Backend-Deployments laufen rootless über `prodctl`: Entwicklung und Produktion
haben getrennte self-hosted Convex-Instanzen. Die ignorierten Dateien
`.env.development` und `.env.production` enthalten lokale CLI-, Build- und
Auth-Handoff-Werte;
die Auth-Schlüssel werden beim Backend-Deployment erzeugt und separat in Convex
gesetzt. Alte Cloud-Overrides wurden entfernt; falls `convex dev` `.env.local`
neu erzeugt, bleibt sie eine CLI-generierte, nicht zu bearbeitende Datei.

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

Convex-Funktionen nach Produktion deployen:

```bash
bun run convex:deploy
```

Backend provisionieren und deployen:

```bash
bun run backend:deploy:development
bun run backend:deploy
```

Umgebungswerte in die jeweilige Convex-Instanz synchronisieren:

```bash
bun run backend:env:sync:development
bun run backend:env:sync
```

Die reservierten `CONVEX_SELF_HOSTED_*`-, `CONVEX_DEPLOYMENT`- und CLI-Token
Variablen bleiben lokal. `CONVEX_SITE_URL` ist bei self-hosted Convex ein
verwalteter Built-in-Wert (aus dem Site-Origin), während `JWT_PRIVATE_KEY` und
`JWKS` für `@convex-dev/auth` in Convex gesetzt werden. Die Backend-Routen sind
`convex-akademie-dev.contentoren.de` / `api.preview.akademie.contentoren.de` sowie
`convex-akademie.contentoren.de` / `api.akademie.contentoren.de`.

Backend-E2E (Health, Auth-Discovery, Passwort-Sign-up und geschützte Query):

```bash
bun run backend:e2e:development
bun run backend:e2e
```

## Checks

```bash
bun run typecheck
bun test
bun run frontend:build
bun run frontend:build:development
```

## Systemd User Services

Der Development-Preview-Service liegt unter `ops/akademie.service`. Er baut ausschließlich mit `.env.development` nach `dist-development/` und startet `vite preview` auf `127.0.0.1:3120`.

Das produktive SSR-Frontend liegt unter `ops/akademie-prod.service`. Es verwendet den separaten Port `3122` und die Produktionsausgabe `dist/`. Da der TanStack-Start-Build kein `index.html` für statisches Hosting erzeugt, wird er nicht zu Cloudflare Pages hochgeladen: `dist/server/server.js` wird über den lokalen SSR-Service ausgeliefert.

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

Produktionsservice installieren beziehungsweise neustarten:

```bash
bun run frontend:production:install
bun run frontend:production:restart
```

## Docker Compose

Docker Compose startet nur die Vite-App. Convex läuft separat über `bun run convex:dev` oder über ein verbundenes Convex-Deployment:

```bash
docker compose up
```

## Deployment-Hinweise

- `.env` nicht committen.
- `.env.development` und `.env.production` nicht committen.
- `bun run frontend:build` lädt ausschließlich `.env.production`.
- `bun run frontend:build:development` lädt ausschließlich `.env.development`.
- `VITE_CONVEX_URL` pro Umgebung auf die jeweilige self-hosted Route setzen.
- Convex-Funktionen mit dem passenden Backend-Skript deployen.
- `bun run frontend:configure` idempotentiert den Akademie-DNS-Eintrag über die vorhandenen Cloudflare-CLI-Helfer und konfiguriert `project-registry` für Preview und Produktion. Dabei werden keine fremden Projekte oder Backend-Routen geändert.
- `bun run frontend:deploy` baut Production, aktiviert DNS/HTTPS/Reverse-Proxy und startet das produktive SSR-Frontend.
- `bun run deploy` führt danach zusätzlich das bestehende Produktions-Backend-Deployment aus.

Produktions- und Preview-Routen:

| Umgebung | Frontend | Convex | Convex Site/API |
|---|---|---|---|
| Development | `https://preview.akademie.contentoren.de` | `https://convex-akademie-dev.contentoren.de` | `https://api.preview.akademie.contentoren.de` |
| Production | `https://akademie.contentoren.de` | `https://convex-akademie.contentoren.de` | `https://api.akademie.contentoren.de` |

`project-registry` stellt für das Frontend den globalen Caddy-Reverse-Proxy inklusive TLS bereit. Die vier Convex-Hostnames bleiben die bestehenden prodctl-/Cloudflare-Tunnel-Routen. Für einen Infrastruktur-Check:

```bash
bun run frontend:configure
bun run backend:e2e:development
bun run backend:e2e
curl -fsS https://convex-akademie.contentoren.de/version
curl -fsS https://convex-akademie-dev.contentoren.de/version
curl -fsS https://api.akademie.contentoren.de/.well-known/openid-configuration
curl -fsS https://api.preview.akademie.contentoren.de/.well-known/openid-configuration
```

## Funktionen

- Landingpage mit Convex-Übersicht
- Kundenliste mit Profilanlage
- Kundenprofil mit Name, E-Mail, Firma und Notizen
- Textdateien pro Kunde mit Typ `profile`, `progress`, `note` oder `test`
- Textdatei-Editor für freie Inhalte
- Fortschrittspunkte pro Kunde mit Status `open`, `in_progress`, `done`
- Fortschrittsanzeige pro Kunde
