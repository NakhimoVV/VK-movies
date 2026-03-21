import type { Movie } from './types'

export const moviesMock: Movie[] = [
  {
    id: 1,
    title: 'Интерстеллар',
    year: 2014,
    rating: 8.7,
    posterUrl: '/posters/interstellar.svg',
  },
  {
    id: 2,
    title: 'Бегущий по лезвию 2049',
    year: 2017,
    rating: 8.0,
    posterUrl: '/posters/blade-runner-2049.svg',
  },
  {
    id: 3,
    title: 'Остров проклятых',
    year: 2010,
    rating: 8.2,
    posterUrl: '/posters/shutter-island.svg',
  },
  {
    id: 4,
    title: 'Дюна: Часть вторая',
    year: 2024,
    rating: 8.5,
    posterUrl: '/posters/dune-part-two.svg',
  },
]
