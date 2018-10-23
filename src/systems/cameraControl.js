// @flow
import type { GameConfig, Engine } from '../types/game'

import { systemPriorities } from 'core'
import { createSystem } from 'core/factories'
import { nCameraControl } from '../nodes'

export default ($config: GameConfig, $engine: Engine) => (
  createSystem({
    update({ camera, motion, control, position }) {
      motion.vel.mult(motion.damp)

      camera.camera.x = position.pos.x
      camera.camera.y = position.pos.y

      if (control.up.isDown) {
        motion.vel.y = -control.dy
      }
      if (control.down.isDown) {
        motion.vel.y = control.dy
      }
      if (control.left.isDown) {
        motion.vel.x = -control.dx
      }
      if (control.right.isDown) {
        motion.vel.x = control.dx
      }
    },
  })(nCameraControl)($engine)
)

export const params = {
  priority: systemPriorities.MOVEMENT,
}
