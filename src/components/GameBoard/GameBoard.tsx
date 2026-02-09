import WordRow from '../WordRow/WordRow'
import styles from './GameBoard.module.css'
import type { WordRowCharacters } from '../WordRow/WordRow'

type GameBoardProps = {
  character_rows: WordRowCharacters[]
}

function GameBoard({ character_rows }: GameBoardProps) {
  return (
    <div className={styles.gameBoard}>
      {character_rows.map((characters, rowIdx) => (
        <WordRow key={rowIdx} character_cell_props={characters} />
      ))}
    </div>
  )
}

export default GameBoard
