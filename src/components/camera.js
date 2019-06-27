import { component } from 'core/ecs'
import { createCamera } from 'core/camera'

class CameraRaw {
  camera
  origin = null

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
export const Camera = component('camera', CameraRaw)
