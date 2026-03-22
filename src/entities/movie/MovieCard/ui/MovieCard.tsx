import Image from 'next/image'
import { Icon16CalendarOutline } from '@vkontakte/icons'
import { Card } from '@vkontakte/vkui'
import Badge from '@/shared/ui/Badge'
import RatingView from '@/shared/ui/RatingView'
import type { Movie } from '../../model/types'
import styles from './MovieCard.module.scss'

type MovieCardProps = {
  movie: Movie
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const ratingValue = movie.rating !== null ? Number((movie.rating / 2).toFixed(1)) : 0
  const ratingLabel = movie.rating !== null ? movie.rating.toFixed(1) : 'Нет рейтинга'
  const yearLabel = movie.year !== null ? String(movie.year) : 'Год неизвестен'

  return (
    <Card className={styles.card} mode="outline">
      <div className={styles.posterWrap}>
        <Image
          alt={`Постер фильма ${movie.title}`}
          className={styles.poster}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 220px"
          src={movie.posterUrl}
          unoptimized
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>

        <div className={styles.body}>
          <Badge>{movie.kind}</Badge>

          <Badge icon={<Icon16CalendarOutline />}>
            {yearLabel}
          </Badge>

          <Badge accent className={styles.ratingBadge}>
            <RatingView label={ratingLabel} value={ratingValue} />
          </Badge>
        </div>
      </div>
    </Card>
  )
}

export default MovieCard
