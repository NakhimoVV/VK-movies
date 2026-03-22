'use server'

import type { PoiskkinoMovieSearchResponse } from '@/shared/api/poiskkino/model'
import { poiskkinoApi } from '@/shared/api/poiskkino'

export async function loadMovies(
  query: string,
  page: number,
): Promise<PoiskkinoMovieSearchResponse> {
  const normalizedQuery = query.trim()

  if (!normalizedQuery) {
    throw new Error('Query is required for movie search')
  }

  if (page < 1) {
    throw new Error('Page must be greater than 0')
  }

  return poiskkinoApi.searchMovieByQuery(normalizedQuery, page)
}
