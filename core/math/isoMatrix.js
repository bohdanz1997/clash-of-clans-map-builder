import { Matrix } from '../pixi'
import { toRad } from './utils'

export const makeIsoMatrix = (angle, scaleY) => {
  const m = new Matrix()
  m.rotate(angle)
  m.scale(1, scaleY)
  m.scale(Math.sqrt(2), Math.sqrt(2))
  return m
}

export const isoMatrix = makeIsoMatrix(toRad(45), 0.75)
export const invertIsoMatrix = isoMatrix.clone().invert()
