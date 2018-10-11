// @flow
import type { GameConfig, Engine, Keyboard } from '../types/game'
import type { Application } from '../types/pixi'

import { systemPriorities } from '../core'
import { keys } from '../core/input'
import { createSystem } from '../core/factories'
import { nCameraControl } from '../nodes'
import { gameUtils } from '../services'

export default ($config: GameConfig, $engine: Engine, $app: Application, $keyboard: Keyboard) => {
  const [kW, kA, kS, kD] = $keyboard.addKeys(
    keys.W, keys.A, keys.S, keys.D
  )

  return createSystem({
    init() {
      this.camera = gameUtils.worldCamera(
        $app.stage,
        $config.worldWidth,
        $config.worldHeight,
        $config,
      )
    },

    update({ motion, control, position }) {
      motion.vel.mult(motion.damp)

      this.camera.x = position.pos.x
      this.camera.y = position.pos.y

      if (kW.isDown) {
        motion.vel.y = -control.dy
      }
      if (kS.isDown) {
        motion.vel.y = control.dy
      }
      if (kA.isDown) {
        motion.vel.x = -control.dx
      }
      if (kD.isDown) {
        motion.vel.x = control.dx
      }
    },
  })(nCameraControl)($engine)
}

export const params = {
  priority: systemPriorities.MOVEMENT,
}
