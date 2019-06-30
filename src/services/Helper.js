import { Point } from 'pixi.js'

export class Helper {
  constructor({ map }) {
    this.cellSize = map.config.cellWidth
  }

  prepareDrag(initiatorIsoPosition, targetPosition) {
    const startPos = new Point(targetPosition.x, targetPosition.y)
    const offset = new Point(
      this.normCoord(initiatorIsoPosition.cartX - targetPosition.x),
      this.normCoord(initiatorIsoPosition.cartY - targetPosition.y),
    )

    return { startPos, offset }
  }

  prepareFollow(x, y) {
    const startPos = this.normToCenter(x, y)
    const offset = new Point(this.cellSize, this.cellSize)

    return { startPos, offset }
  }

  prepareFollowUI(initiatorPos, targetPos) {
    const startPos = new Point(initiatorPos.x, initiatorPos.y)
    const offset = new Point(
      initiatorPos.x - targetPos.x,
      initiatorPos.y - targetPos.y,
    )

    return { startPos, offset }
  }

  normToCenter(x, y) {
    return new Point(
      this.normCoord(x) - this.cellSize,
      this.normCoord(y) - this.cellSize,
    )
  }

  normCoord(val) {
    return Math.floor(val / this.cellSize) * this.cellSize
  }

  toMapCoords(x, y) {
    return new Point(
      Math.round(x / this.cellSize),
      Math.round(y / this.cellSize),
    )
  }
}
