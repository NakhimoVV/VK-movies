import { getRequiredEnv } from '@/shared/config/env'
import type { PoiskkinoMovieSearchResponse } from './model'

const BASE_URL = 'https://api.poiskkino.dev'
const VERSION_URL = 'v1.4'
const DEFAULT_PER_PAGE = 10

async function fetchPoiskkino<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}/${VERSION_URL}/${endpoint}`, {
    headers: {
      'X-API-KEY': getRequiredEnv('POISKKINO_API_KEY'),
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Poiskkino request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const poiskkinoApi = {
  searchMovieByQuery(
    query: string,
    page: number,
    perPage: number = DEFAULT_PER_PAGE,
  ) {
    return fetchPoiskkino<PoiskkinoMovieSearchResponse>(
      `movie/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
    )
  },
}
