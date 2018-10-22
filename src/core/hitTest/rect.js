import { calcOffset } from './util'

export const hitTestRect = (rect, point, offset = undefined) => {
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
