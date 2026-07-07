// aca pongo el header con la navegacion principal de la aplicacion
import { Link, useLocation } from 'react-router-dom'
import { Film, Heart, Search, Clapperboard } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [busqueda, setBusqueda] = useState('')

  // aca manejo el envio del formulario de busqueda
  function handleBuscar(e) {
    e.preventDefault()
    if (busqueda.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(busqueda.trim())}`)
      setBusqueda('')
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cine-950/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* aca pongo el logo y el nombre de la aplicacion */}
        <Link to="/" className="flex items-center gap-2 text-white hover:text-marca-400 transition-colors">
          <Clapperboard className="w-6 h-6 text-marca-500" />
          <span className="font-bold text-lg">Cartelera</span>
        </Link>

        {/* aca pongo la barra de busqueda en el centro */}
        <form onSubmit={handleBuscar} className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar películas..."
              className="w-full bg-cine-800 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-marca-500/50 transition-colors"
            />
          </div>
        </form>

        {/* aca pongo los links de navegacion */}
        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className={`flex items-center gap-1.5 text-sm transition-colors ${location.pathname === '/' ? 'text-marca-400' : 'text-gray-400 hover:text-white'}`}
          >
            <Film className="w-4 h-4" />
            <span className="hidden sm:inline">Cartelera</span>
          </Link>
          <Link
            to="/favoritos"
            className={`flex items-center gap-1.5 text-sm transition-colors ${location.pathname === '/favoritos' ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
          >
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Favoritos</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
