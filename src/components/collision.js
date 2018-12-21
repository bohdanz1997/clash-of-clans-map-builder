import { defComponent } from 'core/scent'
import { Rectangle } from 'core/pixi'

export const Collision = defComponent(
  'collision', 'bounds',
  ({ width, height, radius = 1 }) => {
    const bounds = new Rectangle(0, 0, width, height)
    return {
      bounds,
      width,
      height,
      radius,
    }
  }
)
