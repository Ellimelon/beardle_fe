
import styles from './CharacterCell.module.css'
import { STATUS } from './constants'
import type { Props } from './types'

function CharacterCell({ character = null, status = STATUS.ABSENT }: Props) {
  return (
    <div className={`${styles.characterCell} ${styles[status]}`}>{character}</div>
  )
}

export default CharacterCell
