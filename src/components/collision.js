import { createComponent } from 'core/factories'
import { Rectangle } from 'core/pixi'

export const [cCollision, Collision] = createComponent(
  'collision', 'bounds',
  ({ width, height, sizeInCells = 1 }) => {
    const bounds = new Rectangle(0, 0, width, height)
    return {
      bounds,
      width,
      height,
      sizeInCells,
    }
  }
)
