import { createComponent } from '../core/factories'
import { Point, Rectangle } from '../core/pixi'

export const [cPosition, Position] = createComponent(
  'position', 'pos offset',
  ({ x = 0, y = 0, offsetX = 0, offsetY = 0 } = {}) => ({
    pos: new Point(x, y),
    offset: new Point(offsetX, offsetY),
  })
)

export const [cMotion, Motion] = createComponent(
  'motion', 'vel damp',
  ({ vx = 0, vy = 0, dampX = 1, dampY = 1 } = {}) => ({
    vel: new Point(vx, vy),
    damp: new Point(dampX, dampY),
  })
)

export const [cControl, Control] = createComponent(
  'control', 'dx dy up down left right',
  ({ dx = 0, dy = 0, up, down, left, right } = {}) => ({ dx, dy, up, down, left, right })
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

export const [cPointer, Pointer] = createComponent(
  'pointer', 'pointer',
)

export const [cDraggable, Draggable] = createComponent(
  'draggable'
)

export const [cIsoPosition, IsoPosition] = createComponent(
  'isoPosition', 'pos',
  ({ x = 0, y = 0 } = {}) => ({ pos: new Point(x, y) })
)
