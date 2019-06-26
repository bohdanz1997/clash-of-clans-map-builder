import { Point } from 'pixi.js'

export class Align {
  constructor({ renderer }) {
    /** @type {PIXI.Rectangle} */
    this.bounds = renderer.screen.clone()
  }

  topLeft = (offsetX, offsetY) => new Point(offsetX, offsetY)
  topRight = (offsetX, offsetY) => new Point(this.bounds.right - offsetX, offsetY)
  bottomLeft = (offsetX, offsetY) => new Point(offsetX, this.bounds.bottom - offsetY)
  bottomRight = (offsetX, offsetY) => new Point(this.bounds.right - offsetX, this.bounds.bottom - offsetY)

  top = offsetY => new Point(0, offsetY)
  bottom = offsetY => new Point(0, this.bounds.bottom - offsetY)
  left = offsetX => new Point(0, offsetX)
  right = offsetX => new Point(0, this.bounds.right - offsetX)
}
