import type { Config } from "tailwindcss";
const config: Config = { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"], theme: { extend: { colors: { ink: "#050505", surface: "#111111", electric: "#2563EB" }, fontFamily: { sans: ["var(--font-inter)", "Arial", "sans-serif"], display: ["var(--font-space)", "Arial", "sans-serif"] }, boxShadow: { glow: "0 0 80px rgba(37,99,235,.25)" } } }, plugins: [] };
export default config;
