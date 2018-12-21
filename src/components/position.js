import { defComponent } from 'core/scent'
import { Point } from 'core/pixi'

export const Position = defComponent(
  'position', 'pos fieldPos offset',
  ({ x = 0, y = 0, offsetX = 0, offsetY = 0 } = {}) => ({
    pos: new Point(x, y),
    fieldPos: Point.EMPTY,
    offset: new Point(offsetX, offsetY),
  })
)

export const IsoPosition = defComponent(
  'isoPosition', 'pos',
  ({ x = 0, y = 0 } = {}) => ({ pos: new Point(x, y) })
)
