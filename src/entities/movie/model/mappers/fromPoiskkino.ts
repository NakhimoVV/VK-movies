import type { PoiskkinoMovieDto } from '@/shared/api/poiskkino/model'
import type { Movie } from '../types'

const MOVIE_KIND_MAP: Record<string, string> = {
  movie: 'Фильм',
  'tv-series': 'Сериал',
  cartoon: 'Мультфильм',
  'animated-series': 'Анимационный сериал',
  anime: 'Аниме',
}

function getMovieTitle(movie: PoiskkinoMovieDto): string {
  return movie.name || movie.alternativeName || movie.enName || `ID ${movie.id}`
}

function getMovieRating(movie: PoiskkinoMovieDto): number | null {
  const rating = movie.rating.kp || movie.rating.imdb

  if (!rating || rating <= 0) {
    return null
  }

  return Number(rating.toFixed(1))
}

export function fromPoiskkino(movie: PoiskkinoMovieDto): Movie {
  return {
    id: movie.id,
    title: getMovieTitle(movie),
    year: movie.year > 0 ? movie.year : null,
    rating: getMovieRating(movie),
    posterUrl:
      movie.poster?.previewUrl ||
      movie.poster?.url ||
      '/posters/movie-placeholder.svg',
    description:
      movie.shortDescription ||
      movie.description ||
      'Описание для этого тайтла пока отсутствует.',
    type: movie.type,
    kind: MOVIE_KIND_MAP[movie.type] || 'Тайтл',
  }
}
