import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSingleFile()],
  build: {
    rollupOptions: {
      input: {
        app: "./clock.html", // default
      },
    },
  },
});
