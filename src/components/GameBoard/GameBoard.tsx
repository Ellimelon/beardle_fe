import WordRow from '../WordRow'
import type { Props } from './types'
import styles from './GameBoard.module.css'
import { keyDownHandler } from './GameBoard.utils'

function GameBoard({ ref, state, stateSetters, word }: Props) {
  return (
    <div ref={ref} className={styles.gameBoard} onKeyDown={keyDownHandler(state, stateSetters, word)} tabIndex={0}>
      {state.characterCellsProps.map((characterCellProps, rowIdx) => (
        <WordRow key={rowIdx} characterCells={characterCellProps} />
      ))}
    </div>
  )
}

export default GameBoard
