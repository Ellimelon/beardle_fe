import WordRow from '../WordRow/WordRow'
import type { Props } from './types'
import styles from './GameBoard.module.css'
import { STATUS } from './constants'
import { STATUS as CHARACTER_CELL_STATUS } from '../CharacterCell/constants'
import { CHARACTERS } from '../CharacterCell/constants'
import type { Character } from '../CharacterCell/types'

function GameBoard({ ref, state, stateSetters, word }: Props) {
  const isCharacter = (value: string): value is Character => {
    return CHARACTERS.includes(value as Character)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (state.status !== STATUS.IN_PROGRESS) {
      return
    }
    const key = e.key.toUpperCase()
    if (
      isCharacter(key)
      && state.characterCellsProps[state.pointerYIndex][state.pointerXIndex].character === null
    ) {
      stateSetters.setCharacterCellProps(
        (prev) => {
          const next = prev.map((row) => [...row])
          next[state.pointerYIndex][state.pointerXIndex].character = key

          return next
        }
      )
      stateSetters.setPointerXIndex(
        (prev) => {
          return Math.min(
            prev + 1,
            state.characterCellsProps[state.pointerYIndex].length - 1,
          )
        }
      )
    }
    else if (
      (e.key === 'Backspace' || e.key === 'Delete')
      && state.pointerXIndex > 0
    ) {
      const target_x_index: number =
        state.characterCellsProps[state.pointerYIndex][state.pointerXIndex].character !== null
          ? state.pointerXIndex
          : state.pointerXIndex - 1
      
      stateSetters.setCharacterCellProps(
        (prev) => {
          const next = prev.map((row) => [...row])
          next[state.pointerYIndex][target_x_index].character = null

          return next
        }
      )

      if (target_x_index < state.pointerXIndex) {
        stateSetters.setPointerXIndex(target_x_index)
      }
    }
    else if (
      e.key === 'Enter'
      && state.characterCellsProps[state.pointerYIndex].every(
        (character_cell_prop) => character_cell_prop.character !== null
      )
    ) {
      stateSetters.setCharacterCellProps(
        (prev) => {
          const next = prev.map((row) => [...row])
          const available_letters: string[] = word.split('')
          for (let x = 0; x < next[state.pointerYIndex].length; x++) {
            const character = next[state.pointerYIndex][x].character
            if (character === word[x]) {
              next[state.pointerYIndex][x].status = CHARACTER_CELL_STATUS.CORRECT
              available_letters.splice(available_letters.indexOf(character!), 1)
            }
          }
          for (let x = 0; x < next[state.pointerYIndex].length; x++) {
            const character = next[state.pointerYIndex][x].character
            if (available_letters.includes(character!)) {
              next[state.pointerYIndex][x].status = CHARACTER_CELL_STATUS.PRESENT
              available_letters.splice(available_letters.indexOf(character!), 1)
            }
          }

          return next
        }
      )

      if (
        state.characterCellsProps[state.pointerYIndex].every((cell, x) => cell.character === word[x])
      ) {
        stateSetters.setStatus(STATUS.WON)
      }
      else if (state.pointerYIndex + 1 >= state.characterCellsProps.length) {
        stateSetters.setStatus(STATUS.LOST)
      }
      else{
        stateSetters.setPointerYIndex(
          (prev) => {
            return Math.min(
              prev + 1,
              state.characterCellsProps.length - 1
            )
          }
        )
        stateSetters.setPointerXIndex(0)
      }
    }
  }

  return (
    <div ref={ref} className={styles.gameBoard} onKeyDown={handleKeyDown} tabIndex={0}>
      {state.characterCellsProps.map((characterCellProps, rowIdx) => (
        <WordRow key={rowIdx} characterCells={characterCellProps} />
      ))}
    </div>
  )
}

export default GameBoard
