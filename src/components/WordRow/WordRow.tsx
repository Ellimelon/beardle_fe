import CharacterCell from "../CharacterCell"
import type { Props } from "./types"
import styles from './WordRow.module.css'

function WordRow({ characterCells }: Props) {
  return (
    <div className={styles.wordRow}>
      {characterCells.map((characterCell, rowIdx) => (
        <CharacterCell key={rowIdx} character={characterCell.character} status={characterCell.status} />
      ))}
    </div>
  )
}

export default WordRow
