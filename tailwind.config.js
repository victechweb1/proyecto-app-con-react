// aca configuro tailwind con los colores y fuentes de la aplicacion
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // uso Inter como fuente principal, queda mas limpio que system-ui
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // colores personalizados de la marca de la app
        marca: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // colores oscuros para el modo cine
        cine: {
          950: '#0a0a0f',
          900: '#111118',
          800: '#1a1a24',
          700: '#2a2a3a',
        },
      },
    },
  },
  plugins: [],
}
