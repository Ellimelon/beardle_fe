import { CHARACTERS, STATUS as CHARACTER_CELL_STATUS } from '../CharacterCell/constants'
import type { Character } from '../CharacterCell/types'
import type { CharacterCellProps } from '../CharacterCell'
import { STATUS } from './constants'
import type { State, StateSetters, Status } from './types'
import type { Props } from './types'
import React, { useRef, useState } from 'react'

const isCharacter = (value: string): value is Character => {
  return CHARACTERS.includes(value as Character)
}

function keyDown(
  e: React.KeyboardEvent<HTMLDivElement>,
  state: State,
  stateSetters: StateSetters,
  word: string,
): void {
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
      (prev) =>  Math.min(
        prev + 1,
        state.characterCellsProps[state.pointerYIndex].length - 1,
      )
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
        (prev) => Math.min(
            prev + 1,
            state.characterCellsProps.length - 1
        )
      )
      stateSetters.setPointerXIndex(0)
    }
  }
}

export const keyDownHandler = (
  state: State,
  stateSetters: StateSetters,
  word: string,
) => (e: React.KeyboardEvent<HTMLDivElement>) => keyDown(e, state, stateSetters, word)

export function generateGameBoardArgs(
  character_cell_props: CharacterCellProps[][],
  pointer: {x: number, y: number},
  status: Status,
  word: string,  // ToDo: Remove this argument. The GameBoard Component will not need to know the word, only what's been entered so far.
): Props {
    const ref = useRef<HTMLDivElement>(null)
    const [pointer_y, setPointerY] = useState<number>(pointer.y)
    const [pointer_x, setPointerX] = useState<number>(pointer.x)
    const [character_cells_props, setCharacterCellProps] = useState<CharacterCellProps[][]>(character_cell_props)
    const [_status, setStatus] = useState<Status>(status)

  return {
    state: {
      pointerYIndex: pointer_y,
      pointerXIndex: pointer_x,
      characterCellsProps: character_cells_props,
      status: _status,
    }, 
    stateSetters: {
      setPointerYIndex: setPointerY,
      setPointerXIndex: setPointerX,
      setCharacterCellProps: setCharacterCellProps,
      setStatus: setStatus,
    },
    ref,
    word,
  }
}

export function generateEmptyGameBoardArgs(
  x_length: number,
  y_length: number,
  word: string,  // ToDo: Remove this argument. The GameBoard Component will not need to know the word, only what's been entered so far.
): Props {
  return generateGameBoardArgs(
    Array.from({ length: y_length }, () =>
      Array.from({ length: x_length }, () => ({ character: null, status: CHARACTER_CELL_STATUS.ABSENT }))
    ),
    {x: 0, y: 0},
    STATUS.IN_PROGRESS,
    word,
  )
}

export function resetGameBoardProgress(
  stateSetters: StateSetters,
): void {
  stateSetters.setCharacterCellProps(
    (prev) => prev.map((row) => row.map(() => ({ character: null, status: CHARACTER_CELL_STATUS.ABSENT })))
  )
  stateSetters.setPointerYIndex(0)
  stateSetters.setPointerXIndex(0)
  stateSetters.setStatus(STATUS.IN_PROGRESS)
}