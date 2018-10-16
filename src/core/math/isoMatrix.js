// @flow
import type { Matrix } from '../../types/pixi'

import { PIXI } from '../pixi'
import { toRad } from './utils'

export const getIsoMatrix = (): Matrix => {
  const m: Matrix = new PIXI.Matrix()
  m.rotate(toRad(45))
  m.scale(1, 0.75)
  m.scale(Math.sqrt(2), Math.sqrt(2))
  return m
}
