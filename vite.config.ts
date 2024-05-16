import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
      // generateScopedName: "[hash:base64:2]",
    },
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import tsconfigPaths from "vite-tsconfig-paths";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
//   css: {
//     modules: {
//       localsConvention: "camelCase",
//       // generateScopedName: "[hash:base64:2]",
//     },
//   },
// });
