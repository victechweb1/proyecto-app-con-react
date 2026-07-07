// aca armamos la pagina de favoritos donde se ven las peliculas guardadas
import { Link } from 'react-router-dom'
import GridPeliculas from '../components/GridPeliculas'
import { Heart } from 'lucide-react'

export default function FavoritosPage({ favoritos, esFavorito, onToggleFavorito }) {
  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-400" />
              Mis favoritos
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {favoritos.length} {favoritos.length === 1 ? 'película guardada' : 'películas guardadas'}
            </p>
          </div>
        </div>

        {/* aca muestro las peliculas favoritas o un mensaje si no hay */}
        {favoritos.length > 0 ? (
          <GridPeliculas
            peliculas={favoritos}
            loading={false}
            esFavorito={esFavorito}
            onToggleFavorito={onToggleFavorito}
          />
        ) : (
          // aca pongo un mensaje cuando no hay favoritos
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No tienes películas favoritas aún</p>
            <p className="text-gray-600 text-sm mb-6">Explora la cartelera y guarda las que más te gusten</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-marca-600 hover:bg-marca-500 text-white px-6 py-3 rounded-xl font-medium transition-all"
            >
              Ir a la cartelera
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
