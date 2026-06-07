import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    proxy: {},
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id) return;

          if (id.includes("node_modules/react")) {
            return "react";
          }

          if (id.includes("node_modules/react-dom")) {
            return "react";
          }

          if (id.includes("react-router-dom")) {
            return "router";
          }

          if (id.includes("@tanstack/react-query")) {
            return "query";
          }

          if (id.includes("@clerk/clerk-react")) {
            return "clerk";
          }

          if (id.includes("recharts")) {
            return "recharts";
          }
        },
      },
    },
  },
});
