// aca pongo la portada principal con carrusel automatico de peliculas
// pedi ayuda a la ia para implementar el carrusel con intervalo de 1s
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { getImgUrl } from '../lib/tmdb'

export default function Hero({ peliculas = [] }) {
  const [indice, setIndice] = useState(0)
  const imagenes = peliculas.filter(p => p.backdrop_path).slice(0, 10)

  // aca roto las imagenes cada 1 segundo
  useEffect(() => {
    if (imagenes.length === 0) return
    const intervalo = setInterval(() => {
      setIndice(i => (i + 1) % imagenes.length)
    }, 1000)
    return () => clearInterval(intervalo)
  }, [imagenes.length])

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* aca pongo el fondo con las imagenes del carrusel */}
      {imagenes.map((p, i) => (
        <div
          key={p.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === indice ? 1 : 0 }}
        >
          <img
            src={getImgUrl(p.backdrop_path, 'original')}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cine-950 via-cine-950/80 to-cine-950/60" />
        </div>
      ))}

      {/* aca pongo el overlay de gradiente por si no hay imagenes */}
      {imagenes.length === 0 && (
        <div className="absolute inset-0 bg-gradient-to-b from-cine-900 via-cine-950 to-cine-950" />
      )}

      {/* aca pongo el contenido principal del hero a la izquierda */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight text-balance">
            Descubre las{' '}
            <span className="bg-gradient-to-r from-marca-400 to-purple-400 bg-clip-text text-transparent">
              películas
            </span>{' '}
            que están en el cine
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
            Mira los estrenos, guarda tus favoritas y entérate dónde verlas.
          </p>

          {/* aca pongo los botones para explorar */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-marca-600 hover:bg-marca-500 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-marca-500/25 active:scale-95"
            >
              Ver cartelera
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              to="/favoritos"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-medium transition-all active:scale-95"
            >
              Mis favoritos
            </Link>
          </div>

          {/* aca pongo los indicadores del carrusel */}
          {imagenes.length > 1 && (
            <div className="flex gap-2 mt-8">
              {imagenes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndice(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === indice ? 'w-8 bg-marca-500' : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
