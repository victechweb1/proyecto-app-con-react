// aca armamos la pagina principal con la cartelera de peliculas
import { useState, useEffect } from 'react'
import { getCartelera } from '../lib/tmdb'
import GridPeliculas from '../components/GridPeliculas'
import Hero from '../components/Hero'

export default function Home({ esFavorito, onToggleFavorito }) {
  const [peliculas, setPeliculas] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  // aca cargo las peliculas de la cartelera al montar el componente
  useEffect(() => {
    async function cargar() {
      setLoading(true)
      try {
        const data = await getCartelera(pagina)
        setPeliculas(data.results || [])
        setTotalPaginas(Math.min(data.total_pages, 50))
      } catch (error) {
        console.error('error al cargar cartelera:', error)
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [pagina])

  return (
    <main>
      {/* aca pongo el hero solo en la primera pagina con el carrusel de peliculas */}
      {pagina === 1 && <Hero peliculas={peliculas} />}

      {/* aca pongo la seccion de la cartelera */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">En cartelera</h2>
            <p className="text-sm text-gray-500 mt-1">Películas disponibles en cines ahora</p>
          </div>
        </div>

        {/* aca pongo el grid de peliculas */}
        <GridPeliculas
          peliculas={peliculas}
          loading={loading}
          esFavorito={esFavorito}
          onToggleFavorito={onToggleFavorito}
        />

        {/* aca pongo la paginacion */}
        {totalPaginas > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setPagina(p => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="px-4 py-2 rounded-lg bg-cine-800 text-gray-300 hover:bg-cine-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
            >
              Anterior
            </button>
            <span className="text-sm text-gray-500 px-4">
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className="px-4 py-2 rounded-lg bg-cine-800 text-gray-300 hover:bg-cine-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
    </main>
  )
}
