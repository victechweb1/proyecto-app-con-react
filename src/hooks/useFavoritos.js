// aca manejo el CRUD de favoritos guardados en LocalStorage
// pedi ayuda a la ia para hacer las validaciones y evitar duplicados
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'peliculas_favoritos'

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState([])
  const [cargado, setCargado] = useState(false)

  // al iniciar, cargo los favoritos guardados en el navegador
  useEffect(() => {
    try {
      const guardados = localStorage.getItem(STORAGE_KEY)
      if (guardados) {
        setFavoritos(JSON.parse(guardados))
      }
    } catch (e) {
      console.error('error al cargar favoritos:', e)
    }
    setCargado(true)
  }, [])

  // guardo los cambios en localStorage cada vez que cambia la lista
  useEffect(() => {
    if (cargado) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos))
    }
  }, [favoritos, cargado])

  // aca agrego una pelicula a favoritos si no esta ya agregada
  function agregarFavorito(pelicula) {
    setFavoritos(prev => {
      if (prev.some(fav => fav.id === pelicula.id)) {
        return prev
      }
      return [pelicula, ...prev]
    })
  }

  // aca elimino una pelicula de favoritos
  function quitarFavorito(id) {
    setFavoritos(prev => prev.filter(p => p.id !== id))
  }

  // aca pregunto si una pelicula esta en favoritos
  function esFavorito(id) {
    return favoritos.some(p => p.id === id)
  }

  return { favoritos, agregarFavorito, quitarFavorito, esFavorito }
}
