import { CHARACTERS, STATUS } from "./constants"

export type Character = typeof CHARACTERS[number]
export type Status = typeof STATUS[keyof typeof STATUS]

export type Props = {
    character?: Character | null
    status?: Status
}