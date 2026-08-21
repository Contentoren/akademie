import { readFileSync, writeFileSync } from "node:fs"

const filePath = new URL(
  "../node_modules/@tanstack/start-plugin-core/dist/esm/vite/prerender.js",
  import.meta.url,
)

const source = readFileSync(filePath, "utf8")
const previewWithEphemeralPort = `preview: {
				port: 0,
				open: false
			}`
const previewWithoutPort = `preview: {
				open: false
			}`

const next = source.includes(previewWithEphemeralPort)
  ? source
  : source.replace(previewWithoutPort, previewWithEphemeralPort)

if (next === source && !source.includes(previewWithEphemeralPort)) {
  throw new Error("TanStack prerender preview port override was not found")
}

if (next !== source) {
  writeFileSync(filePath, next)
}
