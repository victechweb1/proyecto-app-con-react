// aca pongo el footer con la informacion de la pagina
import { Clapperboard, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-cine-950 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* aca pongo el logo y descripcion */}
          <div className="flex items-center gap-2 text-gray-400">
            <Clapperboard className="w-5 h-5 text-marca-500" />
            <span className="text-sm">Cartelera App — Películas en cartelera</span>
          </div>

          {/* aca pongo los creditos */}
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span>Datos proporcionados por TMDB</span>
            <span>© {new Date().getFullYear()}</span>
            {/* aca pongo el enlace a mi github */}
            <a
              href="https://github.com/victechweb1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>victechweb1</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
