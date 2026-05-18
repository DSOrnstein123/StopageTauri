import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  base: "./",
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@core-plugins": path.resolve(__dirname, "./src/core-plugins"),
      "@system": path.resolve(__dirname, "./src/system"),
    },
  },
});
