// aca configuro el acceso a la API de TMDB (The Movie Database)
// pedi ayuda a la ia para estructurar bien las llamadas con async/await

const TOKEN = import.meta.env.VITE_TMDB_TOKEN
const BASE_URL = 'https://api.themoviedb.org/3'
const LANG = 'es-CL'

async function fetchFromTMDB(endpoint, params = {}) {
  const query = new URLSearchParams({
    language: LANG,
    ...params,
  })

  try {
    const res = await fetch(`${BASE_URL}${endpoint}?${query}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`error en la api: ${res.status} ${res.statusText}`)
    }
    return await res.json()
  } catch (error) {
    console.error('fallo la llamada a tmdb:', error)
    throw error
  }
}

// aca traigo las peliculas que estan en cartelera ahora
export async function getCartelera(page = 1) {
  return fetchFromTMDB('/movie/now_playing', { page })
}

// aca traigo los proximos estrenos
export async function getProximos(page = 1) {
  return fetchFromTMDB('/movie/upcoming', { page })
}

// aca traigo el detalle completo de una pelicula
export async function getDetallePelicula(id) {
  return fetchFromTMDB(`/movie/${id}`, {
    append_to_response: 'videos,credits,recommendations'
  })
}

// aca traigo donde se puede ver la pelicula (cines, streaming, alquiler)
export async function getDondeVer(id) {
  return fetchFromTMDB(`/movie/${id}/watch/providers`)
}

// aca busco peliculas por texto
export async function buscarPeliculas(query, page = 1) {
  return fetchFromTMDB('/search/movie', { query, page })
}

// aca traigo la lista de generos disponibles
export async function getGeneros() {
  return fetchFromTMDB('/genre/movie/list')
}

// aca armo la url de la imagen segun el tamaño que necesito
export function getImgUrl(path, size = 'w500') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}
