import { useState, useEffect, useRef } from 'react'

import GameBoard from './components/GameBoard'
import { STATUS } from './components/CharacterCell/constants'
import type { CharacterCellProps } from './components/CharacterCell'
import { STATUS as GAME_STATUS } from './components/GameBoard/constants'
import type { Status as GameStatus } from './components/GameBoard/types'
import styles from './App.module.css'

const MAX_INPUT_LENGTH = 5
const MAX_ATTEMPTS = 6
const WORD = 'SHARK' as const

function App() {
  const gameBoardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gameBoardRef.current?.focus()
  }, [])

  
  const [pointer_y_index, setPointerYIndex] = useState<number>(0)
  const [pointer_x_index, setPointerXIndex] = useState<number>(0)
  const [character_cells_props, setCharacterCellProps] = useState<CharacterCellProps[][]>(
    Array.from({ length: MAX_ATTEMPTS }, () =>
      Array.from({ length: MAX_INPUT_LENGTH }, () => ({ character: null, status: STATUS.ABSENT }))
    )
  )
  const [game_status, setGameStatus] = useState<GameStatus>(GAME_STATUS.IN_PROGRESS)

  const onClick = () => {
    setCharacterCellProps(
      Array.from({ length: MAX_ATTEMPTS }, () =>
        Array.from({ length: MAX_INPUT_LENGTH }, () => ({ character: null, status: STATUS.ABSENT }))
      )
    )
    setPointerYIndex(0)
    setPointerXIndex(0)
    setGameStatus(GAME_STATUS.IN_PROGRESS)
  }

  return (
    <div className={styles.app} tabIndex={0}>
      <h1>Bear-dle</h1>
      <GameBoard ref={gameBoardRef} state={{pointerYIndex: pointer_y_index, pointerXIndex: pointer_x_index, characterCellsProps: character_cells_props, status: game_status}} stateSetters={{setPointerYIndex: setPointerYIndex, setPointerXIndex: setPointerXIndex, setCharacterCellProps: setCharacterCellProps, setStatus: setGameStatus}} word={WORD}/>
      <div onClick={onClick}>RESET</div>
    </div>
  )
}

export default App
