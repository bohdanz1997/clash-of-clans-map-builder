import { useNodes, onUpdate } from 'core/ecs'
import { Point } from 'pixi.js'
import * as c from '../components'
import * as n from '../nodes'

export const CameraTouchControl = () => {
  useNodes([n.CameraControl, n.PointerIdle])

  const limitScrollSpeed = (point, maxValue) => {
    const x = Math.min(point.x, maxValue)
    const y = Math.min(point.y, maxValue)

    point.x = Math.max(x, -maxValue)
    point.y = Math.max(y, -maxValue)
  }

  onUpdate((cameraNodes, pointerNodes) => {
    if (!cameraNodes.head) {
      return
    }
    const { motion, camera } = cameraNodes.head

    pointerNodes.each((pointer) => {
      const { context, position } = pointer

      // temp fix
      if (context.isDown && !pointer.entity.has(c.Child.Preview)) {
        if (camera.origin) {
          const newVel = new Point(camera.origin.x - position.x, camera.origin.y - position.y)
          limitScrollSpeed(newVel, motion.maxVel)

          motion.vel.x = newVel.x
          motion.vel.y = newVel.y
        }
        camera.origin = new Point(position.x, position.y)
      } else {
        camera.origin = null
      }
    })
  })
}
