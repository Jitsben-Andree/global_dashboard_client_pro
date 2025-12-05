import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Simplificamos la ruta para que Tailwind escanee TODO dentro de la carpeta src sin excepción
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;