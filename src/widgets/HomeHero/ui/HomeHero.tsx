import MovieSearch from '@/features/MovieSearch'
import styles from './HomeHero.module.scss'

const HomeHero = () => {
  const titleId = 'home-hero-title'

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby={titleId}>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <span className={styles.label}>VK Movies</span>
            <h1 className={styles.title} id={titleId}>
              Найди фильм на вечер
            </h1>
            <p className={styles.description}>
              Ищи фильмы, сериалы и мультфильмы по каталогу Poiskkino и сразу
              переходи к выдаче с фильтрами по URL.
            </p>
            <MovieSearch
              className={styles.search}
              placeholder="Название фильма, сериала или мультфильма"
              variant="hero"
            />
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomeHero
