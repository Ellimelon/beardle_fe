import CharacterCell from "./CharacterCell"
import styles from './WordRow.module.css'
import type { CharacterCellProps } from "./CharacterCell"

export type WordRowCharacters = CharacterCellProps[]

type WordRowProps = {
  character_cell_props: WordRowCharacters
}

function WordRow({ character_cell_props }: WordRowProps) {
  return (
    <div className={styles.wordRow}>
      {character_cell_props.map((character_cell_prop, rowIdx) => (
        <CharacterCell key={rowIdx} character={character_cell_prop.character} status={character_cell_prop.status} />
      ))}
    </div>
  )
}

export default WordRow
