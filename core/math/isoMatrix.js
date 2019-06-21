import { Matrix } from '../pixi'
import { toRad } from './utils'

const makeIsoMatrix = (angle, scaleY) => {
  const m = new Matrix()
  m.rotate(angle)
  m.scale(1, scaleY)
  m.scale(Math.sqrt(2), Math.sqrt(2))
  return m
}

const isoMatrix = makeIsoMatrix(toRad(45), 0.75)
const invertIsoMatrix = isoMatrix.clone().invert()

export class MatrixHelper {
  static get isoMatrix() {
    return isoMatrix
  }

  static get ivertIsoMatrix() {
    return invertIsoMatrix
  }
}
