export type PoiskkinoMovieDto = {
  id: number
  name: string | null
  alternativeName: string | null
  enName: string | null
  type: string
  year: number
  description: string | null
  shortDescription: string | null
  poster: {
    url: string | null
    previewUrl: string | null
  } | null
  rating: {
    kp: number
    imdb: number
    filmCritics: number
    russianFilmCritics: number
    await: number
  }
}

export type PoiskkinoMovieSearchResponse = {
  docs: PoiskkinoMovieDto[]
  total: number
  limit: number
  page: number
  pages: number
}
