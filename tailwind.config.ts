import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Основной цвет (Фиолетовый)
        primary: {
          DEFAULT: "var(--color-primary-default)", // Темно-фиолетовый, из лого
          light: "var(--color-primary-light)", // Чуть светлее
        },
        // Акцентный цвет (Неоново-салатовый)
        accent: {
          DEFAULT: "var(--color-accent-default)", // Ярко-салатовый
          dark: "var(--color-accent-dark)", // Чуть темнее
        },
        // Фон
        background: "var(--color-background)", // Мягкий светло-серый
        // Текст
        content: "var(--color-content)", // Почти черный
      },
      fontFamily: {
        // Установка Manrope как основного шрифта
        sans: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        // Неоновая тень для кнопок
        'neon': '0 0 10px var(--color-accent-default), 0 0 20px var(--color-accent-default)',
      }
    },
  },
  plugins: [],
};

export default config;
