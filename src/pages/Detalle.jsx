// aca armamos la pagina de detalle de cada pelicula
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getDetallePelicula, getDondeVer, getImgUrl } from '../lib/tmdb'
import { ArrowLeft, Star, Clock, Calendar, Heart, Play, Monitor, MapPin } from 'lucide-react'

export default function Detalle({ esFavorito, onToggleFavorito }) {
  const { id } = useParams()
  const [pelicula, setPelicula] = useState(null)
  const [dondeVer, setDondeVer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // aca cargo el detalle y los proveedores al montar el componente
  useEffect(() => {
    async function cargarDetalle() {
      setLoading(true)
      setError(null)
      try {
        const [detalle, proveedores] = await Promise.all([
          getDetallePelicula(id),
          getDondeVer(id),
        ])
        setPelicula(detalle)
        setDondeVer(proveedores.results?.CL || proveedores.results?.US || null)
      } catch (err) {
        setError('No se pudo cargar la información de la película')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    cargarDetalle()
    window.scrollTo(0, 0)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-marca-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (error || !pelicula) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">{error || 'Película no encontrada'}</p>
        <Link to="/" className="text-marca-400 hover:underline">Volver a cartelera</Link>
      </div>
    )
  }

  const rating = Math.round(pelicula.vote_average * 10) / 10
  const duracion = pelicula.runtime
    ? `${Math.floor(pelicula.runtime / 60)}h ${pelicula.runtime % 60}m`
    : null
  const trailer = pelicula.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')
  const proveedores = dondeVer?.flatrate || dondeVer?.rent || dondeVer?.buy || []
  const cine = dondeVer?.rent?.length > 0 || dondeVer?.buy?.length > 0

  return (
    <main className="min-h-screen pt-16">
      {/* aca pongo el fondo con el backdrop de la pelicula */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        {pelicula.backdrop_path ? (
          <img
            src={getImgUrl(pelicula.backdrop_path, 'original')}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-cine-800 to-cine-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cine-950 via-cine-950/60 to-transparent" />

        {/* aca pongo el boton de volver */}
        <Link
          to="/"
          className="absolute top-4 left-4 flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>
      </div>

      {/* aca pongo la info principal de la pelicula */}
      <div className="max-w-7xl mx-auto px-4 -mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* aca pongo el poster */}
          <div className="w-48 md:w-64 shrink-0">
            {pelicula.poster_path ? (
              <img
                src={getImgUrl(pelicula.poster_path, 'w500')}
                alt={pelicula.title}
                className="w-full rounded-xl shadow-2xl shadow-black/50"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-cine-800 rounded-xl flex items-center justify-center">
                <span className="text-gray-600">Sin imagen</span>
              </div>
            )}
          </div>

          {/* aca pongo los detalles */}
          <div className="flex-1 pt-4 md:pt-20">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{pelicula.title}</h1>
            {pelicula.tagline && (
              <p className="text-gray-400 italic mb-4">"{pelicula.tagline}"</p>
            )}

            {/* aca pongo metadatos: rating, año, duracion */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-white font-medium">{rating}</span>
                <span className="text-gray-600">/10</span>
              </div>
              {pelicula.release_date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(pelicula.release_date).getFullYear()}</span>
                </div>
              )}
              {duracion && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{duracion}</span>
                </div>
              )}
            </div>

            {/* aca pongo los generos */}
            {pelicula.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {pelicula.genres.map(g => (
                  <span key={g.id} className="text-xs px-3 py-1 rounded-full bg-cine-800 text-gray-300 border border-white/5">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {/* aca pongo la sinopsis */}
            {pelicula.overview && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Sinopsis</h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{pelicula.overview}</p>
              </div>
            )}

            {/* aca pongo los botones de accion */}
            <div className="flex flex-wrap items-center gap-3">
              {/* aca pongo el boton de favoritos */}
              <button
                onClick={() => onToggleFavorito(pelicula)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95 ${
                  esFavorito(pelicula.id)
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    : 'bg-cine-800 text-gray-300 border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${esFavorito(pelicula.id) ? 'fill-red-400' : ''}`} />
                {esFavorito(pelicula.id) ? 'En favoritos' : 'Agregar a favoritos'}
              </button>

              {/* aca pongo el link al trailer */}
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95"
                >
                  <Play className="w-4 h-4" />
                  Ver tráiler
                </a>
              )}
            </div>
          </div>
        </div>

        {/* aca pongo la seccion de donde ver la pelicula */}
        {dondeVer && (
          <section className="mt-16 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-marca-400" />
              Dónde ver esta película
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* aca pongo streaming (flatrate) */}
              {dondeVer.flatrate?.length > 0 && (
                <div className="bg-cine-800 border border-white/5 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Streaming
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dondeVer.flatrate.map(p => (
                      <div key={p.provider_id} className="flex items-center gap-2 text-xs text-gray-300">
                        {p.logo_path && (
                          <img src={getImgUrl(p.logo_path, 'w45')} alt={p.provider_name} className="w-6 h-6 rounded" />
                        )}
                        <span>{p.provider_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* aca pongo alquiler (rent) */}
              {dondeVer.rent?.length > 0 && (
                <div className="bg-cine-800 border border-white/5 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Alquiler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dondeVer.rent.map(p => (
                      <div key={p.provider_id} className="flex items-center gap-2 text-xs text-gray-300">
                        {p.logo_path && (
                          <img src={getImgUrl(p.logo_path, 'w45')} alt={p.provider_name} className="w-6 h-6 rounded" />
                        )}
                        <span>{p.provider_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* aca pongo compra (buy) */}
              {dondeVer.buy?.length > 0 && (
                <div className="bg-cine-800 border border-white/5 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    Compra digital
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {dondeVer.buy.map(p => (
                      <div key={p.provider_id} className="flex items-center gap-2 text-xs text-gray-300">
                        {p.logo_path && (
                          <img src={getImgUrl(p.logo_path, 'w45')} alt={p.provider_name} className="w-6 h-6 rounded" />
                        )}
                        <span>{p.provider_name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!dondeVer.flatrate && !dondeVer.rent && !dondeVer.buy && (
              <p className="text-gray-500 text-sm">Información de disponibilidad no disponible para tu región.</p>
            )}
          </section>
        )}

        {/* aca pongo el reparto principal */}
        {pelicula.credits?.cast?.length > 0 && (
          <section className="mt-12 mb-16">
            <h2 className="text-xl font-semibold text-white mb-6">Reparto principal</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
              {pelicula.credits.cast.slice(0, 10).map(persona => (
                <div key={persona.id} className="flex flex-col items-center min-w-[100px]">
                  {persona.profile_path ? (
                    <img
                      src={getImgUrl(persona.profile_path, 'w185')}
                      alt={persona.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-white/10"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-cine-800 flex items-center justify-center ring-2 ring-white/10">
                      <span className="text-gray-600 text-xs">{persona.name[0]}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-300 mt-2 text-center font-medium">{persona.name}</p>
                  <p className="text-xs text-gray-600 text-center">{persona.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
