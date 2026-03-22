'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { FormEvent } from 'react'
import { useTransition } from 'react'
import { Button, Input, NativeSelect, Search } from '@vkontakte/vkui'
import {
  MOVIE_TYPE_OPTIONS,
  type MovieSearchFilters,
} from '@/shared/lib/movieSearch'
import styles from './MovieSearch.module.scss'

type MovieSearchProps = {
  placeholder?: string
  className?: string
  showFilters?: boolean
  variant?: 'hero' | 'toolbar'
}

const MovieSearch = ({
  placeholder = 'Найти фильм, сериал или мультфильм',
  className,
  showFilters = false,
  variant = 'toolbar',
}: MovieSearchProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()
  const currentQuery = searchParams.get('query') ?? ''
  const currentTypeParam = searchParams.get('type') ?? ''
  const currentFilters: MovieSearchFilters = {
    type: MOVIE_TYPE_OPTIONS.some((option) => option.value === currentTypeParam)
      ? currentTypeParam
      : '',
    yearFrom: searchParams.get('yearFrom') ?? '',
    yearTo: searchParams.get('yearTo') ?? '',
  }
  const formClassName = [
    styles.form,
    variant === 'hero' ? styles.hero : styles.toolbar,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const term = String(formData.get('query') ?? '')
    const normalizedTerm = term.trim()
    const type = String(formData.get('type') ?? '').trim()
    const yearFrom = String(formData.get('yearFrom') ?? '').trim()
    const yearTo = String(formData.get('yearTo') ?? '').trim()
    const params = new URLSearchParams(searchParams)

    if (normalizedTerm) {
      params.set('query', normalizedTerm)
      params.set('page', '1')
    } else {
      params.delete('query')
      params.delete('page')
      params.delete('type')
      params.delete('yearFrom')
      params.delete('yearTo')
    }

    if (normalizedTerm) {
      if (type) {
        params.set('type', type)
      } else {
        params.delete('type')
      }

      if (/^\d{4}$/.test(yearFrom)) {
        params.set('yearFrom', yearFrom)
      } else {
        params.delete('yearFrom')
      }

      if (/^\d{4}$/.test(yearTo)) {
        params.set('yearTo', yearTo)
      } else {
        params.delete('yearTo')
      }
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname

    startTransition(() => {
      replace(nextUrl)
    })
  }

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <div className={styles.primaryRow}>
        <Search
          key={currentQuery}
          className={styles.search}
          defaultValue={currentQuery}
          name="query"
          placeholder={placeholder}
        />
        <Button
          className={styles.submit}
          loading={isPending}
          size="m"
          type="submit"
        >
          Найти
        </Button>
      </div>

      {showFilters ? (
        <div className={styles.filtersRow}>
          <NativeSelect
            key={`type-${currentFilters.type}`}
            className={styles.field}
            defaultValue={currentFilters.type}
            name="type"
          >
            {MOVIE_TYPE_OPTIONS.map((option) => (
              <option key={option.value || 'all'} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect>
          <Input
            key={`year-from-${currentFilters.yearFrom}`}
            className={styles.field}
            defaultValue={currentFilters.yearFrom}
            inputMode="numeric"
            max={2099}
            min={1888}
            name="yearFrom"
            placeholder="Год от"
            type="number"
          />
          <Input
            key={`year-to-${currentFilters.yearTo}`}
            className={styles.field}
            defaultValue={currentFilters.yearTo}
            inputMode="numeric"
            max={2099}
            min={1888}
            name="yearTo"
            placeholder="Год до"
            type="number"
          />
        </div>
      ) : null}

      <Button className={styles.mobileSubmit} loading={isPending} size="m" type="submit">
        Найти
      </Button>
    </form>
  )
}

export default MovieSearch
