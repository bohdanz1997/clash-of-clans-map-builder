import { Point } from 'core/pixi'

export const calcOffset = (rect, offset = undefined) => {
  if (offset !== undefined) {
    return new Point(rect.width * offset.x, rect.height * offset.y)
  }
  return Point.EMPTY
}
