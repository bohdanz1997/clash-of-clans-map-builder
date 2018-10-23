import { createComponent } from 'core/factories'
import { Rectangle } from 'core/pixi'

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
