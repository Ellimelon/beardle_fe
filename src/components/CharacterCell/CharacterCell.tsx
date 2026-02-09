
import styles from './CharacterCell.module.css'

export const VALID_ALPHANUMERIC_CHARACTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
] as const
export type AlphanumericCharacter = typeof VALID_ALPHANUMERIC_CHARACTERS[number]
export type CharacterCellCharacter = AlphanumericCharacter | null
export type CharacterCellStatus = 'filled' |'correct' | 'present' | 'absent'
export type CharacterCellProps = {
  character?: CharacterCellCharacter
  status?: CharacterCellStatus
}

function CharacterCell({ character = null, status = 'absent' }: CharacterCellProps) {
  return (
    <div className={`${styles.characterCell} ${styles[status]}`}>{character}</div>
  )
}

export default CharacterCell
