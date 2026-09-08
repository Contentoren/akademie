import { publicCourseCatalog } from "./publicCourseCatalog.js"

const usage = `Usage: bun run catalog <command>

Commands:
  list  Print the public course summary as JSON
  json  Print the complete public course catalog as JSON
  help  Show this help
`

/** Runs the read-only public catalog CLI and returns its process exit code. */
export function publicCourseCatalogCliRun(args: readonly string[]): number {
  const command = args[0] ?? "help"

  if (command === "help" || command === "--help" || command === "-h") {
    console.log(usage)
    return 0
  }

  if (command === "list") {
    console.log(
      JSON.stringify(
        publicCourseCatalog.map((course) => ({
          slug: course.slug,
          title: course.title,
          version: course.version,
          totalMinutes: course.totalMinutes,
          moduleCount: course.modules.length,
        })),
        null,
        2,
      ),
    )
    return 0
  }

  if (command === "json") {
    console.log(JSON.stringify(publicCourseCatalog, null, 2))
    return 0
  }

  console.error(`Unknown public catalog command: ${command}

${usage}`)
  return 1
}
