import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

function inlinePdfMiddleware(): Plugin {
  return {
    name: "inline-pdf-preview",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? "";
        if (url.toLowerCase().endsWith(".pdf")) {
          const filename = url.split("/").pop() ?? "document.pdf";
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            `inline; filename="${filename}"`,
          );
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? "";
        if (url.toLowerCase().endsWith(".pdf")) {
          const filename = url.split("/").pop() ?? "document.pdf";
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            `inline; filename="${filename}"`,
          );
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "server" },
    }),
    react(),
    tailwindcss(),
    inlinePdfMiddleware(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
    tsconfigPaths: true,
  },
  server: {
    port: 3001,
    host: true,
    strictPort: true,
  },
});
