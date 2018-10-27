// @flow
import type { GameConfig, Engine, Keyboard } from 'types/game'
import type { Container } from 'types/pixi'

import { createSystem } from 'core/factories'
import priorities from './priorities'
import { nCameraControl } from '../nodes'

export default ($config: GameConfig, $engine: Engine, $keyboard: Keyboard, $world: Container) => (
  createSystem({
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

      camera.camera.x = position.pos.x
      camera.camera.y = position.pos.y

      const scale = smoothZoom.applyForce($world.scale.x)
      $world.scale.set(scale)
    },
  })(nCameraControl)($engine)
)

export const params = {
  priority: priorities.MOVEMENT,
}
