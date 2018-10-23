import { calcOffset } from './util'

export const hitTestCircular = (circular, point, offset = undefined) => {
  const rectOffset = calcOffset(circular, offset)

  const vx = point.x - (circular.x + (circular.width / 2) - rectOffset.x)
  const vy = point.y - (circular.y + (circular.width / 2) - rectOffset.y)

  const distance = Math.sqrt(vx * vx + vy * vy)

  return distance < circular.width / 2
}
