import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import { solidAiSrcPlugin } from "ai-src/solid"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

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
      prerender: {
        enabled: false,
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
