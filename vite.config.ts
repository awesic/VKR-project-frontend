import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            // components: "/src/components",
            // data: "/src/data",
            // features: "/src/features",
            // hocs: "/src/hocs",
            // pages: "/src/pages",
            // asserts: "/src/asserts",
        },
    },
    server: {
        host: true,
        watch: {
            usePolling: true,
        },
        strictPort: true,
        port: 80,
    },
});
