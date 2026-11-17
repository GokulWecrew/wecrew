import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router-dom")) return "router-vendor";
            if (id.includes("react-helmet-async")) return "seo-vendor";
            if (id.includes("react-hook-form") || id.includes("zod") || id.includes("@hookform"))
              return "form-vendor";
            if (id.includes("lucide-react")) return "icons-vendor";
            if (id.includes("react") || id.includes("react-dom")) return "react-vendor";
          }
        },
      },
    },
  },
});
