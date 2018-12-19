import { createComponent } from 'core/scent'
import { Rectangle } from 'core/pixi'

export const [cCollision, Collision] = createComponent(
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
