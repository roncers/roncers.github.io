import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import million from "million/compiler";
import { fileURLToPath, URL } from "node:url"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    million.vite({
      auto: {
        threshold: 0.05,
        skip: ["useBadHook", /badVariable/g],
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/p5")) return "p5"
          if (id.includes("node_modules/react")) return "react"
        },
      },
    },
  },
})
