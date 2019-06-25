import { Point } from 'pixi.js'

const calcOffset = (rect, offset = undefined) => {
  if (offset !== undefined) {
    return new Point(rect.width * offset.x, rect.height * offset.y)
  }
  return Point.EMPTY
}

export class CollisionChecker {
  static circular(circular, point, offset = undefined) {
    const rectOffset = calcOffset(circular, offset)

    const vx = point.x - (circular.x + (circular.width / 2) - rectOffset.x)
    const vy = point.y - (circular.y + (circular.width / 2) - rectOffset.y)

    const distance = Math.sqrt(vx * vx + vy * vy)

    return distance < circular.width / 2
  }

  static rect(rect, point, offset = undefined) {
    const rectOffset = calcOffset(rect, offset)

    const left = rect.x - rectOffset.x
    const right = rect.x + rect.width - rectOffset.x
    const top = rect.y - rectOffset.y
    const bottom = rect.y + rect.height - rectOffset.y

    return point.x > left
      && point.x < right
      && point.y > top
      && point.y < bottom
  }
}
