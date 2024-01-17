import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	//TODO: check how to handle cors from here
	server: {
		host: "0.0.0.0",
		proxy: {
			"/socket.io/": {
				target: "http://localhost:4000",
				changeOrigin: true,
				secure: false,
				ws: true,
			},
		},
	},
});
