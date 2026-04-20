/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@convex": path.resolve(__dirname, "./convex"),
      "@domain": path.resolve(__dirname, "./domain"),
      "@test": path.resolve(__dirname, "./test"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  test: {
    environment: "node",
    globals: false,
    include: ["test/**/*.test.ts", "test/**/*.test.tsx"],
  },
});
