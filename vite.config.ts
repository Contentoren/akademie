import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  server: {
    port: 3120,
    strictPort: true,
    host: true,
    allowedHosts: ["preview.akademie.contentoren.de", "localhost"],
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      router: {
        routesDirectory: "routes",
      },
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: false,
      },
    }),
    react(),
  ],
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 1050,
    outDir: "dist",
    assetsDir: "assets",
    emptyOutDir: true,
  },
})
