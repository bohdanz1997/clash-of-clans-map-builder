import { component } from 'core/scent'
import { Point } from 'pixi.js'

class PositionRaw {
  offset = Point.EMPTY
  x = 0
  y = 0
  col = 0
  row = 0

  constructor({ x = 0, y = 0, offsetX = 0, offsetY = 0 } = {}) {
    this.x = x
    this.y = y
    this.offset = new Point(offsetX, offsetY)
  }
}

class IsoPositionRaw {
  x = 0
  y = 0
  cartX = 0
  cartY = 0
  col = 0
  row = 0

  constructor({ x = 0, y = 0 } = {}) {
    this.x = x
    this.y = y
  }
}

/** @type {PositionRaw} */
export const Position = component('position', PositionRaw)

/** @type {IsoPositionRaw} */
export const IsoPosition = component('isoPosition', IsoPositionRaw)
