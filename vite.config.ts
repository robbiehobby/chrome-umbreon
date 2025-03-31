import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/locales",
          dest: "",
          rename: "_locales",
        },
      ],
    }),
  ],
  publicDir: "./static",
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: "./index.html",
        chrome: "./src/apis/chrome.ts",
        background: "./src/app/background.ts",
        content: "./src/app/content.ts",
      },
      output: {
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
