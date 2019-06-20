import { defComponent } from 'core/scent'
import { createCamera } from 'core/camera'

class CameraRaw {
  camera

  constructor({ world, worldWidth, worldHeight, width, height }) {
    this.camera = createCamera({
      world,
      worldWidth,
      worldHeight,
      width,
      height,
    })
  }
}

/** @type {CameraRaw} */
export const Camera = defComponent('camera', CameraRaw)
