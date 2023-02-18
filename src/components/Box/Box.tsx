import styles from './Box.module.sass'

interface BoxProps {
  t: number
}

function Box ({ t }: BoxProps) {
  return (
    <div className={styles.box} data-testid="Box">
      Box Component
    </div>
  )
}

export default Box
