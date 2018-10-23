// @flow
import type { Matrix } from 'types/pixi'

import { PIXI } from '../pixi'
import { toRad } from '../math'

export const makeIsoMatrix = (angle: number, scaleY: number): Matrix => {
  const m: Matrix = new PIXI.Matrix()
  m.rotate(angle)
  m.scale(1, scaleY)
  m.scale(Math.sqrt(2), Math.sqrt(2))
  return m
}

export const isoMatrix = makeIsoMatrix(toRad(45), 0.75)
