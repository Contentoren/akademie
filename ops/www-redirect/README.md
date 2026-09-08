# WWW redirect

`akademie-www-redirect` is a separate Cloudflare Pages project. It serves one
permanent, path- and query-preserving redirect from
`www.akademie.contentoren.de` to `https://akademie.contentoren.de`.

Run the deterministic local check before deployment:

```bash
bun run www-redirect:check
bun run www-redirect:create # safe to skip when the project already exists
bun run deploy:www-redirect
```

The custom-domain move is intentionally separate from the upload: remove
`www.akademie.contentoren.de` from the `akademie` Pages project and attach it to
`akademie-www-redirect`, then verify:

```bash
bun run www-redirect:verify
```
