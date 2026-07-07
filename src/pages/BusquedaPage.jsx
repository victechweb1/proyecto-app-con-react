// aca armamos la pagina de resultados de busqueda
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { buscarPeliculas } from '../lib/tmdb'
import GridPeliculas from '../components/GridPeliculas'
import { Search, ArrowLeft } from 'lucide-react'

export default function BusquedaPage({ esFavorito, onToggleFavorito }) {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [peliculas, setPeliculas] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagina, setPagina] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  // aca busco las peliculas cada vez que cambia la busqueda o la pagina
  useEffect(() => {
    if (!query) return

    async function buscar() {
      setLoading(true)
      try {
        const data = await buscarPeliculas(query, pagina)
        setPeliculas(data.results || [])
        setTotalPaginas(Math.min(data.total_pages, 50))
      } catch (error) {
        console.error('error al buscar:', error)
      } finally {
        setLoading(false)
      }
    }
    buscar()
  }, [query, pagina])

  // aca reinicio la pagina cuando cambia la busqueda
  useEffect(() => {
    setPagina(1)
  }, [query])

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* aca pongo el encabezado con la busqueda */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Search className="w-6 h-6 text-marca-400" />
              Resultados para "{query}"
            </h1>
            {!loading && (
              <p className="text-sm text-gray-500 mt-1">
                {peliculas.length} {peliculas.length === 1 ? 'resultado' : 'resultados'}
              </p>
            )}
          </div>
        </div>

        {/* aca muestro los resultados o el mensaje de no resultados */}
        {query ? (
          <>
            <GridPeliculas
              peliculas={peliculas}
              loading={loading}
              esFavorito={esFavorito}
              onToggleFavorito={onToggleFavorito}
            />

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
          </>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">Ingresa un término de búsqueda para encontrar películas</p>
          </div>
        )}
      </div>
    </main>
  )
}
