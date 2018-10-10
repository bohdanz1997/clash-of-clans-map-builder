import { createComponent } from '../core/factories'
import { Point, Rectangle } from '../core/pixi'

export const [cPosition, Position] = createComponent(
  'position', 'pos',
  ({ x = 0, y = 0 } = {}) => ({ pos: new Point(x, y) })
)

export const [cMotion, Motion] = createComponent(
  'motion', 'vel',
  ({ vx = 0, vy = 0 } = {}) => ({ vel: new Point(vx, vy), dir: 0 })
)

export const [cControl, Control] = createComponent(
  'control', 'dx dy dampX dampY',
  ({ dx = 0, dy = 0, dampX = 1, dampY = 1 } = {}) => ({ dx, dy, dampX, dampY })
)

export const [cDamage, Damage] = createComponent(
  'damage', 'damage',
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
)

export const [cBrain, Brain] = createComponent(
  'brain', 'maxTime currentMaxTime timer',
  ({ maxTime }) => ({
    maxTime,
    timer: 0,
    currentMaxTime: 0,
  })
)

export const [cFSM, FSM] = createComponent(
  'fsm', 'fsm',
)
