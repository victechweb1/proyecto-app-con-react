# 🎬 Cartelera App — Películas en cartelera

Aplicación web SPA desarrollada con **React + Vite** que muestra las películas en cartelera usando la API de **TMDB (The Movie Database)**.

---

## ✨ Funcionalidades

- **Cartelera actual** — Muestra las películas que están en cines ahora
- **Detalle de película** — Sinopsis, reparto, rating, duración, tráiler
- **Dónde ver** — Información de plataformas de streaming, alquiler o compra
- **Buscador** — Busca películas por nombre
- **Favoritos** — Guarda y administra tus películas favoritas (CRUD con LocalStorage)
- **Paginación** — Navega entre páginas de resultados
- **Responsive** — Diseño adaptable a celulares, tablets y escritorio

---

## 🛡️ Seguridad

Esta aplicación implementa las siguientes cabeceras de seguridad:

| Cabecera | Valor | Propósito |
|---|---|---|
| **Content-Security-Policy** | `default-src 'self'; script-src 'self' https://api.themoviedb.org; ...` | Controla qué orígenes pueden cargar recursos |
| **X-Frame-Options** | `DENY` | Evita clickjacking (no se puede cargar en un iframe) |
| **X-Content-Type-Options** | `nosniff` | Evita que el navegador adivine el tipo MIME |
| **Referrer-Policy** | `strict-origin-when-cross-origin` | Controla el envío del referer |
| **Strict-Transport-Security** | `max-age=31536000; includeSubDomains` | Fuerza conexiones HTTPS |

> Además, todas las llamadas a la API externa (TMDB) se hacen con validación de errores mediante `try/catch` y `async/await`, y los datos sensibles se manejan de forma segura.

---

## 🤖 Uso de IA en el desarrollo

Este proyecto fue desarrollado con asistencia de **herramientas de IA generativa** para:

- **Estructurar llamadas a la API de TMDB** con `async/await` y manejo de errores
- **Diseñar componentes reutilizables** siguiendo buenas prácticas de React
- **Implementar enlaces a plataformas** (YouTube, Netflix, etc.) desde el detalle de cada película
- **Validar y optimizar el código** aplicando principios de seguridad y rendimiento
- **Generar esta documentación** y los comentarios explicativos en el código

> La IA se utilizó como herramienta de apoyo para mejorar la calidad, seguridad y estructura del código, siguiendo las recomendaciones de la rúbrica de evaluación.

---

## 🛠️ Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| **React** | 18 | Librería de interfaz de usuario |
| **Vite** | 5 | Bundler y servidor de desarrollo |
| **Tailwind CSS** | 3 | Estilos y diseño responsive |
| **React Router** | 6 | Navegación SPA |
| **Framer Motion (motion)** | 11 | Animaciones |
| **Lucide React** | — | Iconos vectoriales |
| **TMDB API** | v3 | Datos de películas |
| **LocalStorage** | — | Persistencia de favoritos |

---

## 📦 Instalación y uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/victechweb1/proyecto-app-con-react.git
cd proyecto-app-con-react

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo (abre en http://localhost:3000)
npm run dev

# 4. Compilar para producción
npm run build
```

> **Nota:** La aplicación usa una API key de TMDB incluida para fines demostrativos. Para producción, reemplázala con tu propia key en `src/lib/tmdb.js`.

---

## 📁 Estructura del proyecto

```
peliculas-app/
├── index.html              # Cabeceras de seguridad y punto de entrada
├── vite.config.js           # Configuración de Vite (puerto 3000, headers)
├── tailwind.config.js       # Configuración de Tailwind
├── postcss.config.js        # Configuración de PostCSS
├── public/                  # Archivos estáticos
├── src/
│   ├── main.jsx             # Punto de entrada de React
│   ├── App.jsx              # Componente principal con rutas
│   ├── index.css            # Estilos globales y Tailwind
│   ├── lib/
│   │   ├── tmdb.js          # Llamadas a la API de TMDB
│   │   └── utils.js         # Utilidades (cn)
│   ├── hooks/
│   │   └── useFavoritos.js  # Hook de CRUD favoritos con LocalStorage
│   ├── components/
│   │   ├── Header.jsx       # Barra de navegación
│   │   ├── Hero.jsx         # Portada principal
│   │   ├── PeliculaCard.jsx # Tarjeta de película
│   │   ├── GridPeliculas.jsx# Grid de tarjetas
│   │   └── Footer.jsx       # Pie de página
│   └── pages/
│       ├── Home.jsx         # Página de cartelera
│       ├── Detalle.jsx      # Detalle de película
│       ├── FavoritosPage.jsx# Favoritos guardados
│       └── BusquedaPage.jsx # Resultados de búsqueda
```

---

## 🔌 API — TMDB (The Movie Database)

Endpoints utilizados de la API v3 de TMDB:

| Endpoint | Propósito |
|---|---|
| `/movie/now_playing` | Películas en cartelera |
| `/movie/upcoming` | Próximos estrenos |
| `/movie/{id}` | Detalle de película |
| `/movie/{id}/watch/providers` | Dónde ver (streaming, alquiler, compra) |
| `/search/movie` | Búsqueda de películas |
| `/genre/movie/list` | Lista de géneros |

---

## 📸 Capturas de pantalla

| | |
|---|---|
| ![Home](public/screenshots/1.png) | ![Detalle de película](public/screenshots/2.png) |
| ![Favoritos](public/screenshots/3.png) | ![Búsqueda](public/screenshots/4.png) |

*(Reemplaza los nombres con los archivos que subas: 1.png, 2.png, 3.png, etc.)*

---

## 👨‍💻 Autor

**Victor Aguilera** — Estudiante Analista Programador INACAP

- GitHub: [@victechweb1](https://github.com/victechweb1)

---

## 📄 Licencia

Este proyecto es educativo y fue desarrollado como evaluación para el módulo **Desarrollo de Aplicaciones Web SPA con React**. Los datos de películas son proporcionados por [TMDB](https://www.themoviedb.org/).
