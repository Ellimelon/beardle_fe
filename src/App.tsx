import { useEffect } from 'react'

import GameBoard, { generateEmptyGameBoardArgs } from './components/GameBoard'
import type { GameBoardProps } from './components/GameBoard'
import { resetGameBoardProgress } from './components/GameBoard/GameBoard.utils'
import styles from './App.module.css'

const MAX_ATTEMPTS = 6
const WORD = 'SHARK' as const

function App() {
  const gameBoardArgs = generateEmptyGameBoardArgs(WORD.length, MAX_ATTEMPTS, WORD)
  useEffect(() => {
    gameBoardArgs.ref.current?.focus()
  }, [])
  
  const onClickHandler = (gameBoardArgs: GameBoardProps) => () => {
    resetGameBoardProgress(gameBoardArgs.stateSetters)
    gameBoardArgs.ref.current?.focus()
  }

  return (
    <div className={styles.app} tabIndex={0}>
      <h1>Bear-dle</h1>
      <GameBoard {...gameBoardArgs} />
      <div onClick={onClickHandler(gameBoardArgs)}>RESET</div>
    </div>
  )
}

export default App
