// aca armo la aplicacion principal con las rutas y el estado global de favoritos
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Detalle from './pages/Detalle'
import FavoritosPage from './pages/FavoritosPage'
import BusquedaPage from './pages/BusquedaPage'
import { useFavoritos } from './hooks/useFavoritos'

export default function App() {
  const { favoritos, agregarFavorito, quitarFavorito, esFavorito } = useFavoritos()

  // aca manejo el toggle de favoritos desde cualquier componente
  function handleToggleFavorito(pelicula) {
    if (esFavorito(pelicula.id)) {
      quitarFavorito(pelicula.id)
    } else {
      agregarFavorito(pelicula)
    }
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-cine-950">
        <Header />
        <div className="flex-1">
          <Routes>
            {/* aca van las rutas de cada pagina */}
            <Route path="/" element={
              <Home esFavorito={esFavorito} onToggleFavorito={handleToggleFavorito} />
            } />
            <Route path="/pelicula/:id" element={
              <Detalle esFavorito={esFavorito} onToggleFavorito={handleToggleFavorito} />
            } />
            <Route path="/favoritos" element={
              <FavoritosPage
                favoritos={favoritos}
                esFavorito={esFavorito}
                onToggleFavorito={handleToggleFavorito}
              />
            } />
            <Route path="/buscar" element={
              <BusquedaPage esFavorito={esFavorito} onToggleFavorito={handleToggleFavorito} />
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
