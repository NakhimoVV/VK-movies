import { fromPoiskkino } from '@/entities/movie/MovieCard'
import type { Movie } from '@/entities/movie/model/types'
import { loadMovies } from '@/shared/lib/actions'
import {
  applyMovieFilters,
  getMovieSearchState,
  type MoviePageSearchParams,
} from '@/shared/lib/movieSearch'
import HomeHero from '@/widgets/HomeHero'
import MovieList from '@/widgets/MovieList'

type HomePageProps = {
  searchParams?: Promise<MoviePageSearchParams>
}

export default async function HomePage(props: HomePageProps) {
  const searchParams = await props.searchParams
  const { query, page, filters } = getMovieSearchState(searchParams)

  if (!query) {
    return <HomeHero />
  }

  let movies: Movie[] = []
  let total = 0
  let currentPage = page
  let errorMessage: string | undefined

  try {
    const data = await loadMovies(query, page)

    movies = applyMovieFilters(data.docs.map(fromPoiskkino), filters)
    total = data.total
    currentPage = data.page
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : 'Не удалось выполнить поиск'
  }

  return (
    <MovieList
      errorMessage={errorMessage}
      filters={filters}
      movies={movies}
      page={currentPage}
      query={query}
      total={total}
    />
  )
}
