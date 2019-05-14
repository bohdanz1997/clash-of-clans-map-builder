import { Point } from 'core/pixi'

export class Helper {
  constructor(cellSize) {
    this.cellSize = cellSize
  }

  prepareDrag(clientPosition, sourcePosition) {
    const startPos = new Point(sourcePosition.x, sourcePosition.y)
    const offset = new Point(
      this.normCoord(clientPosition.cartX - sourcePosition.x),
      this.normCoord(clientPosition.cartY - sourcePosition.y),
    )

    return { startPos, offset }
  }

  normCoord(val) {
    return Math.floor(val / this.cellSize) * this.cellSize
  }
}