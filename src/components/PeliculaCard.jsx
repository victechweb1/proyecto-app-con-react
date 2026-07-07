// aca pongo la tarjeta individual de cada pelicula con su informacion basica
import { Link } from 'react-router-dom'
import { Heart, Star, Clapperboard } from 'lucide-react'
import { getImgUrl } from '../lib/tmdb'

export default function PeliculaCard({ pelicula, esFavorito, onToggleFavorito }) {
  const rating = Math.round(pelicula.vote_average * 10) / 10
  const tieneImagen = pelicula.poster_path || pelicula.backdrop_path

  return (
    <div className="group relative bg-cine-800 rounded-xl overflow-hidden border border-white/5 hover:border-marca-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-marca-500/5 hover:-translate-y-1">
      {/* aca pongo el poster de la pelicula */}
      <Link to={`/pelicula/${pelicula.id}`} className="block aspect-[2/3] overflow-hidden">
        {tieneImagen ? (
          <img
            src={getImgUrl(pelicula.poster_path || pelicula.backdrop_path, 'w342')}
            alt={pelicula.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          // aca pongo un placeholder cuando no hay imagen disponible
          <div className="w-full h-full flex items-center justify-center bg-cine-700">
            <Clapperboard className="w-12 h-12 text-gray-600" />
          </div>
        )}

        {/* aca pongo el rating en la esquina superior */}
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span>{rating}</span>
        </div>
      </Link>

      {/* aca pongo la informacion debajo del poster */}
      <div className="p-3">
        <Link to={`/pelicula/${pelicula.id}`}>
          <h3 className="font-semibold text-sm text-white truncate hover:text-marca-400 transition-colors">
            {pelicula.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 mt-1">
          {pelicula.release_date?.split('-')[0] || 'Próximamente'}
        </p>

        {/* aca pongo el boton de favoritos */}
        <button
          onClick={() => onToggleFavorito(pelicula)}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all active:scale-90 ${
            esFavorito ? 'bg-red-500/80 text-white' : 'bg-black/40 text-white/70 hover:text-white hover:bg-black/60'
          }`}
          title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart className={`w-4 h-4 ${esFavorito ? 'fill-white' : ''}`} />
        </button>
      </div>
    </div>
  )
}
