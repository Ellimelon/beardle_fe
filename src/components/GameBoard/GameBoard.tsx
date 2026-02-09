import WordRow from '../WordRow/WordRow'
import type { Props } from './types'
import styles from './GameBoard.module.css'

function GameBoard({ wordRows }: Props) {
  return (
    <div className={styles.gameBoard}>
      {wordRows.map((wordRow, rowIdx) => (
        <WordRow key={rowIdx} characterCells={wordRow.characterCells} />
      ))}
    </div>
  )
}

export default GameBoard
