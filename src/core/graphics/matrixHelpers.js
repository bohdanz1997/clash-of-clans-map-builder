import { PIXI } from '../pixi'

const toRad = deg => deg * Math.PI / 180

export const getIsoMatrix = () => {
  const m = new PIXI.Matrix()
  m.rotate(toRad(45))
  m.scale(1, 0.75)
  m.scale(Math.sqrt(2, 2), Math.sqrt(2, 2))
  return m
}
