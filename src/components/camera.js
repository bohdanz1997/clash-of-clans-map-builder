import { createComponent } from 'core/factories'
import { gameUtils } from '../services'

export const [cCamera, Camera] = createComponent(
  'camera', 'camera',
  ({ world, worldWidth, worldHeight, canvasWidth, canvasHeight }) => ({
    camera: gameUtils.worldCamera(
      world,
      worldWidth,
      worldHeight,
      {
        width: canvasWidth,
        height: canvasHeight,
      }
    ),
  })
)
