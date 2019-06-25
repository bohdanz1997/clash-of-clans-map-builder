import { Point } from 'pixi.js'
import * as n from '../nodes'

export const CameraTouchControl = () => ({
  nodes: [n.CameraControl, n.PointerIdle],

  limitScrollSpeed(point, maxValue) {
    const x = Math.min(point.x, maxValue)
    const y = Math.min(point.y, maxValue)

    point.x = Math.max(x, -maxValue)
    point.y = Math.max(y, -maxValue)
  },

  update(cameraNodes, pointerNodes) {
    if (!cameraNodes.head) {
      return
    }
    const { motion, camera } = cameraNodes.head

    pointerNodes.each((pointer) => {
      const { context, position } = pointer
      if (context.isDown) {
        if (camera.origin) {
          const newVel = new Point(camera.origin.x - position.x, camera.origin.y - position.y)
          this.limitScrollSpeed(newVel, motion.maxVel)

          motion.vel.x = newVel.x
          motion.vel.y = newVel.y
        }
        camera.origin = new Point(position.x, position.y)
      } else {
        camera.origin = null
      }
    })
  },
})
