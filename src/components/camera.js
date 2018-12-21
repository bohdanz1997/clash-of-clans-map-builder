import { defComponent } from 'core/scent'
import { createCamera } from 'core/camera'

export const Camera = defComponent(
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
