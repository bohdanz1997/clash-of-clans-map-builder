import * as n from '../nodes'

export const CameraControl = ({ world }) => ({
  nodes: [n.CameraControl],

  update({ camera, position, motion, motionControl, zoomControl }) {
    const { smoothZoom } = zoomControl

    if (motionControl.up.isDown) {
      motion.vel.y = -motionControl.dy
    }
    if (motionControl.down.isDown) {
      motion.vel.y = motionControl.dy
    }
    if (motionControl.left.isDown) {
      motion.vel.x = -motionControl.dx
    }
    if (motionControl.right.isDown) {
      motion.vel.x = motionControl.dx
    }

    if (zoomControl.plus.isDown) {
      smoothZoom.increase()
    } else if (zoomControl.minus.isDown) {
      smoothZoom.decrease()
    }

    motion.vel.mult(motion.damp)

    camera.camera.x = position.x
    camera.camera.y = position.y

    const scale = smoothZoom.applyForce(world.scale.x)
    world.scale.set(scale)
  },
})
