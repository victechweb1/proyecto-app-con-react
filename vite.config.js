// aca configuro el servidor de desarrollo en el puerto 3000
// y agrego las cabeceras de seguridad que pide la rubrica
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    headers: {
      // aca protejo la pagina contra clickjacking
      'X-Frame-Options': 'DENY',
      // aca evito que el navegador adivine el tipo de contenido
      'X-Content-Type-Options': 'nosniff',
      // aca evito que se envie el referer a sitios externos
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // aca fuerzo el uso de HTTPS
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      // aca controlo que origenes pueden cargar recursos
      'Content-Security-Policy': "default-src 'self'; script-src 'self' https://api.themoviedb.org; connect-src 'self' https://api.themoviedb.org https://image.tmdb.org; img-src 'self' https://image.tmdb.org data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"
    }
  }
})
