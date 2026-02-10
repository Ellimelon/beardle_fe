import type React from "react"
import type { CharacterCellProps } from "../CharacterCell"
import type { STATUS } from "./constants"

export type Status = typeof STATUS[keyof typeof STATUS]

export type State = {
    pointerYIndex: number
    pointerXIndex: number
    characterCellsProps: CharacterCellProps[][]
    status: Status
}

export type StateSetters = {
    setPointerYIndex: React.Dispatch<React.SetStateAction<number>>
    setPointerXIndex: React.Dispatch<React.SetStateAction<number>>
    setCharacterCellProps: React.Dispatch<React.SetStateAction<CharacterCellProps[][]>>
    setStatus: React.Dispatch<React.SetStateAction<Status>>
}

export type Props = {
    state: State
    stateSetters: StateSetters
    ref: React.RefObject<HTMLDivElement | null>
    word: string  // ToDo: Remove this prop. The GameBoard Component will not need to know the word, only what's been entered so far.
}