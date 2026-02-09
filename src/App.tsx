import { useState, useEffect, useRef } from 'react'
import styles from './App.module.css'
import GameBoard from './components/GameBoard'
import { VALID_ALPHANUMERIC_CHARACTERS, type AlphanumericCharacter } from './components/CharacterCell/CharacterCell'
import type { WordRowCharacters } from './components/WordRow/WordRow'

const MAX_INPUT_LENGTH = 5
const MAX_ATTEMPTS = 6
const WORD = 'SHARK' as const
const GAME_STATUS = {
  IN_PROGRESS: 'in_progress',
  WON: 'won',
  LOST: 'lost'
} as const
type GameStatus = typeof GAME_STATUS[keyof typeof GAME_STATUS]

function App() {
  const [input, setInput] = useState<WordRowCharacters[]>(
    Array.from({ length: MAX_ATTEMPTS }, () =>
      Array.from({ length: MAX_INPUT_LENGTH }, () => ({ character: null, status: 'absent' }))
    )
  )
  const [pointer_y_index, setPointerYIndex] = useState<number>(0)
  const [pointer_x_index, setPointerXIndex] = useState<number>(0)
  const [game_status, setGameStatus] = useState<GameStatus>(GAME_STATUS.IN_PROGRESS)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    divRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (game_status !== GAME_STATUS.IN_PROGRESS) {
      return
    }
    if (
      VALID_ALPHANUMERIC_CHARACTERS.includes(e.key.toUpperCase() as any)
      && input[pointer_y_index][pointer_x_index].character === null
    ) {
      var character = e.key.toUpperCase() as AlphanumericCharacter
      setInput(
        (prev) => {
          const next = prev.map((row) => [...row])
          next[pointer_y_index][pointer_x_index].character = character

          return next
        }
      )
      setPointerXIndex((prev) => Math.min(prev + 1, MAX_INPUT_LENGTH -1))
    }
    else if (
      (e.key === 'Backspace' || e.key === 'Delete')
      && pointer_x_index > 0
    ) {
      const target_x_index: number =
        input[pointer_y_index][pointer_x_index].character !== null
          ? pointer_x_index
          : pointer_x_index - 1

      setInput((prev) => {
        const next_input = prev.map((row) => [...row])
        next_input[pointer_y_index][target_x_index].character = null

        return next_input
      })
      
      if (target_x_index < pointer_x_index) {
        setPointerXIndex(target_x_index)
      }
    }
    else if (
      e.key === 'Enter'
      && input[pointer_y_index].every(
        (character_cell_prop) => character_cell_prop.character !== null
      )
    ) {
      setInput((prev) => {
        const next_input = prev.map((row) => [...row])
        const available_letters: string[] = WORD.split('')
        for (let x = 0; x < next_input[pointer_y_index].length; x++) {
          const character = next_input[pointer_y_index][x].character

          if (character === WORD[x]) {
            next_input[pointer_y_index][x].status = 'correct'
            available_letters.splice(available_letters.indexOf(character!), 1)
          }
        }
        for (let x = 0; x < next_input[pointer_y_index].length; x++) {
          const character = next_input[pointer_y_index][x].character
          if (available_letters.includes(character!)) {
            next_input[pointer_y_index][x].status = 'present'
            available_letters.splice(available_letters.indexOf(character!), 1)
          }
        }

        return next_input
      })

      if (input[pointer_y_index].every((cell, x) => cell.character === WORD[x])) {
        setGameStatus(GAME_STATUS.WON)
      }
      else if (pointer_y_index + 1 >= MAX_ATTEMPTS) {
        setGameStatus(GAME_STATUS.LOST)
      }
      else{
        setPointerYIndex((prev) => Math.min(prev + 1, MAX_ATTEMPTS - 1) )
        setPointerXIndex(0)
      }
    }
  }

  return (
    <div ref={divRef} className={styles.app} onKeyDown={handleKeyDown} tabIndex={0}>
      <h1>Bear-dle</h1>
      <GameBoard character_rows={input} />
    </div>
  )
}

export default App
