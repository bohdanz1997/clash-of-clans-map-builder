import { createComponent } from '../core/factories'
import { Point, Rectangle } from '../core/pixi'

export const [cPosition, Position] = createComponent(
  'position', 'pos',
  ({ x = 0, y = 0 } = {}) => ({ pos: new Point(x, y) })
)

export const [cMotion, Motion] = createComponent(
  'motion', 'vx vy',
  ({ vx = 0, vy = 0 } = {}) => ({ vx, vy, dir: 0 })
)

export const [cControl, Control] = createComponent(
  'control', 'dx dy',
  ({ dx = 0, dy = 0 } = {}) => ({ dx, dy })
)

export const [cDamage, Damage] = createComponent(
  'damage', 'rate',
  ({ rate }) => ({ rate })
)

export const [cHealth, Health] = createComponent(
  'health', 'current max',
  ({ health }) => ({
    current: health,
    max: health,
  })
)

export const [cCollision, Collision] = createComponent(
  'collision', 'bounds',
  ({ width, height }) => {
    const bounds = new Rectangle(0, 0, width, height)
    return {
      bounds,
      width,
      height,
    }
  }
)

export const [cDisplay, Display] = createComponent(
  'display', 'sprite',
  ({ sprite }) => ({ sprite })
)

export const [cIntelect, Intelect] = createComponent(
  'intelect', 'maxTime timer',
  ({ maxTime }) => ({
    maxTime,
    timer: 0,
  })
)
