import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import { solidAiSrcPlugin } from "ai-src/solid"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

import { marketingCourses } from "./src/marketing/model/marketingCourses.ts"

const siteUrl = "https://akademie.contentoren.de"
const marketingPrerenderPages = [
  { path: "/", prerender: { enabled: true }, sitemap: { changefreq: "weekly" as const, priority: 1 } },
  { path: "/de", prerender: { enabled: true }, sitemap: { changefreq: "weekly" as const, priority: 1 } },
  { path: "/en", prerender: { enabled: true }, sitemap: { changefreq: "weekly" as const, priority: 0.9 } },
  { path: "/de/kurse", prerender: { enabled: true }, sitemap: { changefreq: "weekly" as const, priority: 0.8 } },
  { path: "/en/courses", prerender: { enabled: true }, sitemap: { changefreq: "weekly" as const, priority: 0.8 } },
  ...marketingCourses.flatMap((course) => [
    {
      path: `/de/kurse/${course.slug}`,
      prerender: { enabled: true },
      sitemap: { changefreq: "yearly" as const, priority: 0.7 },
    },
    {
      path: `/en/courses/${course.slug}`,
      prerender: { enabled: true },
      sitemap: { changefreq: "yearly" as const, priority: 0.7 },
    },
  ]),
] satisfies Array<{
  path: string
  prerender: { enabled: boolean }
  sitemap: { changefreq: "weekly" | "yearly"; priority: number }
}>

export default defineConfig(({ mode }) => ({
  server: {
    port: 3120,
    strictPort: true,
    host: true,
    allowedHosts: ["preview.akademie.contentoren.de", "akademie.contentoren.de", "localhost"],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      router: {
        routesDirectory: "routes",
      },
      pages: marketingPrerenderPages,
      prerender: {
        enabled: true,
        crawlLinks: false,
        autoStaticPathsDiscovery: false,
        autoSubfolderIndex: false,
      },
      sitemap: {
        enabled: true,
        host: siteUrl,
      },
      spa: {
        enabled: true,
        // Use a supported path-only mask distinct from the prerendered root.
        // Start uses this only while generating the SPA shell.
        maskPath: "/customers",
        prerender: {
          outputPath: "/spa",
          crawlLinks: false,
        },
      },
    }),
    solidAiSrcPlugin(),
    solid({ ssr: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("solid-js")) return "solid"
            if (id.includes("@tanstack")) return "tanstack"
            if (id.includes("@adaptive-ds/mdi")) return "icons"
          }
          return undefined
        },
      },
    },
    target: "esnext",
    chunkSizeWarningLimit: 1050,
    outDir: mode === "development" ? "dist-development" : "dist",
    assetsDir: "assets",
    emptyOutDir: true,
  },
}))
