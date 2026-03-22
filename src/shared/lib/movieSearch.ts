import type { Movie } from '@/entities/movie/model/types'

type SearchParamValue = string | string[] | undefined

export type MovieTypeFilter =
  | ''
  | 'movie'
  | 'tv-series'
  | 'cartoon'
  | 'animated-series'
  | 'anime'

export type MovieSearchFilters = {
  type: MovieTypeFilter
  yearFrom: string
  yearTo: string
}

export type MovieSearchState = {
  query: string
  page: number
  filters: MovieSearchFilters
}

export type MoviePageSearchParams = Record<string, SearchParamValue>

export const MOVIE_TYPE_OPTIONS: ReadonlyArray<{
  label: string
  value: MovieTypeFilter
}> = [
  { label: 'Все типы', value: '' },
  { label: 'Фильмы', value: 'movie' },
  { label: 'Сериалы', value: 'tv-series' },
  { label: 'Мультфильмы', value: 'cartoon' },
  { label: 'Анимационные сериалы', value: 'animated-series' },
  { label: 'Аниме', value: 'anime' },
]

function getSingleParam(param: SearchParamValue): string {
  if (Array.isArray(param)) {
    return typeof param[0] === 'string' ? param[0] : ''
  }

  return typeof param === 'string' ? param : ''
}

function getCurrentPage(pageParam: string): number {
  const parsedPage = Number(pageParam)

  if (!Number.isFinite(parsedPage) || parsedPage < 1) {
    return 1
  }

  return parsedPage
}

function normalizeTypeFilter(value: string): MovieTypeFilter {
  const normalizedValue = value.trim() as MovieTypeFilter

  return MOVIE_TYPE_OPTIONS.some((option) => option.value === normalizedValue)
    ? normalizedValue
    : ''
}

function normalizeYearFilter(value: string): string {
  const normalizedValue = value.trim()

  return /^\d{4}$/.test(normalizedValue) ? normalizedValue : ''
}

export function getMovieSearchState(
  searchParams?: MoviePageSearchParams,
): MovieSearchState {
  return {
    query: getSingleParam(searchParams?.query).trim(),
    page: getCurrentPage(getSingleParam(searchParams?.page)),
    filters: {
      type: normalizeTypeFilter(getSingleParam(searchParams?.type)),
      yearFrom: normalizeYearFilter(getSingleParam(searchParams?.yearFrom)),
      yearTo: normalizeYearFilter(getSingleParam(searchParams?.yearTo)),
    },
  }
}

export function hasActiveMovieFilters(filters: MovieSearchFilters): boolean {
  return Boolean(filters.type || filters.yearFrom || filters.yearTo)
}

export function applyMovieFilters(
  movies: Movie[],
  filters: MovieSearchFilters,
): Movie[] {
  const yearFrom = filters.yearFrom ? Number(filters.yearFrom) : null
  const yearTo = filters.yearTo ? Number(filters.yearTo) : null
  const rangeStart =
    yearFrom !== null && yearTo !== null ? Math.min(yearFrom, yearTo) : yearFrom
  const rangeEnd =
    yearFrom !== null && yearTo !== null ? Math.max(yearFrom, yearTo) : yearTo

  return movies.filter((movie) => {
    if (filters.type && movie.type !== filters.type) {
      return false
    }

    if (rangeStart !== null && (movie.year === null || movie.year < rangeStart)) {
      return false
    }

    if (rangeEnd !== null && (movie.year === null || movie.year > rangeEnd)) {
      return false
    }

    return true
  })
}
