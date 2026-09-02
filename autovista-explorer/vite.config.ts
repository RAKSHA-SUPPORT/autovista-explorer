import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  build: {
    outDir: "dist/public",
    emptyOutDir: true,
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "three-vendor";
          }
          if (id.includes("node_modules/@react-three")) {
            return "r3f-vendor";
          }
          if (id.includes("node_modules/lucide-react") || id.includes("node_modules/framer-motion")) {
            return "ui-vendor";
          }
        },
      },
    },
  },
});
