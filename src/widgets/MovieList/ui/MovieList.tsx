import { Box, Group, Header, Placeholder } from '@vkontakte/vkui'
import MovieCard, { Movie } from '@/entities/movie/MovieCard'
import MovieSearch from '@/features/MovieSearch'
import {
  hasActiveMovieFilters,
  type MovieSearchFilters,
} from '@/shared/lib/movieSearch'
import styles from './MovieList.module.scss'

type MovieListProps = {
  query: string
  movies: Movie[]
  total: number
  page: number
  filters: MovieSearchFilters
  errorMessage?: string
}

const MovieList = ({
  query,
  movies,
  total,
  page,
  filters,
  errorMessage,
}: MovieListProps) => {
  const hasQuery = query.trim().length > 0
  const hasResults = movies.length > 0
  const hasFilters = hasActiveMovieFilters(filters)

  return (
    <main className={styles.page}>
      <Box className={styles.shell}>
        <Group header={<Header size="l">Поиск фильмов</Header>}>
          <Box className={styles.searchPanel}>
            <div className={styles.copy}>
              <h1 className={styles.title}>Результаты по запросу «{query}»</h1>
              <p className={styles.lead}>
                Обновляй запрос и фильтры сверху. Все параметры остаются в URL и
                открываются по прямой ссылке.
              </p>
            </div>
            <MovieSearch showFilters />
          </Box>
        </Group>

        {errorMessage ? (
          <Group header={<Header size="s">Ошибка загрузки</Header>}>
            <Placeholder title="Не удалось загрузить результаты">
              {errorMessage}
            </Placeholder>
          </Group>
        ) : null}

        {!errorMessage && !hasQuery ? (
          <Group header={<Header size="s">Начни поиск</Header>}>
            <Placeholder title="Пока нет поискового запроса">
              Введи название фильма, сериала или мультфильма в поле выше.
            </Placeholder>
          </Group>
        ) : null}

        {!errorMessage && hasQuery && !hasResults ? (
          <Group header={<Header size="s">Результаты поиска</Header>}>
            <Placeholder
              title={
                hasFilters
                  ? 'По выбранным фильтрам ничего не найдено'
                  : 'Совпадений не найдено'
              }
            >
              {hasFilters
                ? 'Измени тип или диапазон годов и попробуй снова.'
                : `По запросу «${query}» ничего не найдено.`}
            </Placeholder>
          </Group>
        ) : null}

        {!errorMessage && hasQuery && hasResults ? (
          <Group header={<Header size="s">Результаты поиска</Header>}>
            <Box className={styles.summary}>
              <p className={styles.summaryItem}>Запрос: {query}</p>
              <p className={styles.summaryItem}>Найдено в API: {total}</p>
              <p className={styles.summaryItem}>
                Показано после фильтров: {movies.length}
              </p>
              <p className={styles.summaryItem}>Страница: {page}</p>
            </Box>
            <Box className={styles.list}>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </Box>
          </Group>
        ) : null}
      </Box>
    </main>
  )
}

export default MovieList
