'use client'

import { Box, Group, Header } from '@vkontakte/vkui'
import { MovieCard, moviesMock } from '@/entities/movie'
import styles from './movies-list.module.css'

export function MoviesList() {
  return (
    <main className={styles.page}>
      <Box className={styles.shell}>
        <Group header={<Header size="l">Каталог фильмов</Header>}>
          <Box className={styles.hero}>
            <h1 className={styles.title}>VK Movies</h1>
            <p className={styles.lead}>
              Стартовый экран с фейковыми данными. Следующим шагом этот список
              можно будет перевести на API.
            </p>
          </Box>
        </Group>
        <Group header={<Header size="s">Сейчас в подборке</Header>}>
          <Box className={styles.list}>
            {moviesMock.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
        </Group>
      </Box>
    </main>
  )
}
