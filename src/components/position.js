import { defComponent } from 'core/scent'
import { Point } from 'core/pixi'

export const Position = defComponent(
  'position', 'pos fieldPos offset x y col row',
  ({ x = 0, y = 0, offsetX = 0, offsetY = 0 } = {}) => ({
    pos: new Point(x, y),
    fieldPos: Point.EMPTY,
    offset: new Point(offsetX, offsetY),
    x,
    y,
    col: 0,
    row: 0,
  })
)

export const IsoPosition = defComponent(
  'isoPosition', 'pos x y cartX cartY col row',
  ({ x = 0, y = 0 } = {}) => ({
    pos: new Point(x, y),
    x,
    y,
    col: 0,
    row: 0,
    cartX: 0,
    cartY: 0,
  })
)
