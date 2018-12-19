import { makePointer } from './pointer'
import { makeIsoPointer } from './isoPointer'

export const pointerManager = {
  create: makePointer,
  toIso: makeIsoPointer,
}
