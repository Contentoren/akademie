import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/solid-start/plugin/vite"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import solid from "vite-plugin-solid"

export default defineConfig({
  server: {
    port: 3120,
    strictPort: true,
    host: true,
    allowedHosts: ["preview.akademie.contentoren.de", "localhost"],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@convex": fileURLToPath(new URL("./convex", import.meta.url)),
    },
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
    solid({ ssr: true }),
  ],
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 1050,
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
  },
})
