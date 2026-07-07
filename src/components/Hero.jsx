// aca pongo la portada principal de la pagina de inicio
import { Link } from 'react-router-dom'
import { Sparkles, ChevronRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* aca pongo el fondo con efecto de gradiente tipo cine */}
      <div className="absolute inset-0 bg-gradient-to-b from-cine-900 via-cine-950 to-cine-950" />

      {/* aca pongo el efecto de particulas decorativas usando solo css */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-marca-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* aca pongo el contenido principal del hero */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-marca-400" />
          <span className="text-sm font-medium text-marca-400 tracking-widest uppercase">En cartelera ahora</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight text-balance">
          Descubre las{' '}
          <span className="bg-gradient-to-r from-marca-400 to-purple-400 bg-clip-text text-transparent">
            películas
          </span>{' '}
          que están en el cine
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-xl mx-auto">
          Mira los estrenos, guarda tus favoritas y entérate dónde verlas.
        </p>

        {/* aca pongo los botones para explorar */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
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
      </div>
    </section>
  )
}
