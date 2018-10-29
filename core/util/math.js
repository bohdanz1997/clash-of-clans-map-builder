import { Point } from 'core/pixi'

export const rectCenter = rect => new Point(
  rect.x + rect.width / 2,
  rect.y + rect.height / 2,
)
