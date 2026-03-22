import { Icon16StarAlt } from '@vkontakte/icons'
import styles from './RatingView.module.scss'

type RatingViewProps = {
  value: number
  label?: string
}

const MAX_STARS = 5

const RatingView = ({ value, label }: RatingViewProps) => {
  const filledStars = Math.max(0, Math.min(MAX_STARS, Math.round(value)))
  const ariaLabel = `Rating: ${value} stars`

  return (
    <div aria-label={ariaLabel} className={styles.ratingView} title={ariaLabel}>
      <div className={styles.stars}>
        {Array.from({ length: MAX_STARS }, (_, index) => (
          <Icon16StarAlt
            className={index < filledStars ? styles.starFilled : styles.starEmpty}
            key={`rating-star-${index}`}
          />
        ))}
      </div>
      {label ? <div className={styles.label}>{label}</div> : null}
    </div>
  )
}

export default RatingView
