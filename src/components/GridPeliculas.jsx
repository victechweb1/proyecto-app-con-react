// aca pongo el grid de peliculas con carga perezosa y skeleton loading
import { useState, useEffect } from 'react'
import PeliculaCard from './PeliculaCard'
import { Film } from 'lucide-react'

export default function GridPeliculas({ peliculas, loading, esFavorito, onToggleFavorito }) {
  // aca muestro los skeletons mientras carga
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[2/3] bg-cine-800 rounded-xl" />
            <div className="mt-2 space-y-2 p-1">
              <div className="h-4 bg-cine-800 rounded w-3/4" />
              <div className="h-3 bg-cine-800 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // aca muestro un mensaje si no hay peliculas
  if (!peliculas?.length) {
    return (
      <div className="text-center py-20">
        <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No se encontraron películas</p>
      </div>
    )
  }

  // aca muestro el grid con las peliculas
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {peliculas.map(pelicula => (
        <PeliculaCard
          key={pelicula.id}
          pelicula={pelicula}
          esFavorito={esFavorito(pelicula.id)}
          onToggleFavorito={onToggleFavorito}
        />
      ))}
    </div>
  )
}
