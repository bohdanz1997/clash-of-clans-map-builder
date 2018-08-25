import { createComponent } from '../core/factories'
import { Point, Rectangle } from '../core/util'

export const [cPosition, Position] = createComponent('position', 'pos', ({ x, y }) => ({
  pos: new Point(x, y),
}))

export const [cMotion, Motion] = createComponent('motion', 'vel dir', ({ vx, vy }) => ({
  vel: new Point(vx, vy),
  dir: 0,
}))

export const [cControl, Control] = createComponent('control', 'acceleration')

export const [cDamage, Damage] = createComponent('damage', 'rate', ({ rate }) => ({ rate }))

export const [cHealth, Health] = createComponent('health', 'current max', ({ health }) => ({
  current: health,
  max: health,
}))

export const [cCollision, Collision] = createComponent('collision', 'bounds radius', ({ width, height, radius }) => {
  const bounds = new Rectangle(0, 0, width, height)
  return {
    bounds,
    radius,
    center: bounds.center,
  }
})
