import type { ReactNode } from 'react'
import styles from './Badge.module.scss'

type BadgeProps = {
  children: ReactNode
  className?: string
  icon?: ReactNode
  accent?: boolean
}

function getClassName(className?: string, accent?: boolean): string {
  return [styles.badge, accent ? styles.accent : '', className ?? '']
    .filter(Boolean)
    .join(' ')
}

const Badge = ({ children, className, icon, accent = false }: BadgeProps) => {
  return (
    <div className={getClassName(className, accent)}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <span>{children}</span>
    </div>
  )
}

export default Badge
