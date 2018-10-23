import { createComponent } from 'core/factories'
import { createCamera } from 'core/camera'

export const [cCamera, Camera] = createComponent(
  'camera', 'camera',
  ({ world, worldWidth, worldHeight, width, height }) => ({
    camera: createCamera({
      world,
      worldWidth,
      worldHeight,
      width,
      height,
    }),
  })
)
