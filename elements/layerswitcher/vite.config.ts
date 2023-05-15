import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./src/main.ts",
      name: "eox-layerswitcher",
      // the proper extensions will be added
      fileName: "eox-layerswitcher",
    },
  },
});
