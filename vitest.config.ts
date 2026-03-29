import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/__test__/setupTests.tsx"],
    passWithNoTests: true,
    alias: {
      "@/layout/": new URL("./src/components/Layout/", import.meta.url)
        .pathname,
      "@/components/": new URL("./src/components/", import.meta.url).pathname,
      "@/shared/": new URL("./src/components/shared/", import.meta.url)
        .pathname,
      "@/context/": new URL("./src/context/", import.meta.url).pathname,
      "@/hooks/": new URL("./src/hooks/", import.meta.url).pathname,
      "@/app/": new URL("./app/", import.meta.url).pathname,
      "@/styles/": new URL("./src/styles/", import.meta.url).pathname,
      "@/services/": new URL("./src/services/", import.meta.url).pathname,
      "@/utils/": new URL("./utils/", import.meta.url).pathname,
    },
  },
});
