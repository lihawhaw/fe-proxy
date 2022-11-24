import { atomWithStorage } from 'jotai/utils'

export const enableAtom = atomWithStorage('enable', false)

export const listAtom = atomWithStorage('list', [])
