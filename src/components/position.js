import { createComponent } from 'core/factories'
import { Point } from 'core/pixi'

export const [cPosition, Position] = createComponent(
  'position', 'pos offset',
  ({ x = 0, y = 0, offsetX = 0, offsetY = 0 } = {}) => ({
    pos: new Point(x, y),
    offset: new Point(offsetX, offsetY),
  })
)

export const [cIsoPosition, IsoPosition] = createComponent(
  'isoPosition', 'pos',
  ({ x = 0, y = 0 } = {}) => ({ pos: new Point(x, y) })
)
