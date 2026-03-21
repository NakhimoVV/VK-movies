'use client'

import { ContentCard } from '@vkontakte/vkui'
import type { Movie } from '../model/types'
import styles from './movie-card.module.css'

type MovieCardProps = {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <ContentCard
      alt={`Постер фильма ${movie.title}`}
      caption={`Рейтинг: ${movie.rating.toFixed(1)}`}
      className={styles.card}
      description={`Год выпуска: ${movie.year}`}
      imageObjectFit="cover"
      maxHeight={220}
      mode="shadow"
      overTitle={`Movie #${movie.id}`}
      src={movie.posterUrl}
      title={movie.title}
    />
  )
}
