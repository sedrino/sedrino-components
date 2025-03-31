import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    routeRules: {
      "/___sedrino_agent/**": {
        proxy: {
          to: "http://localhost:9016/**",
        },
      },
    },
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
