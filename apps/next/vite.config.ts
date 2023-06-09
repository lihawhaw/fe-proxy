import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import crx from "vite-plugin-crx-mv3";
import suidPlugin from "@suid/vite-plugin";

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      suidPlugin(),
      solidPlugin(),
      crx({
        manifest: "./src/manifest.json",
      }),
    ],
    build: {
      emptyOutDir: mode === "production",
    },
    // resolve: {
    //   alias: {
    //     "~*": "./src/*",
    //   },
    //   extensions: [".ts", "tsx"],
    // },
  };
});
