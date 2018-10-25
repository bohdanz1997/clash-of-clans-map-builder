// @flow
import type { GameConfig, Engine, Keyboard } from 'types/game'

import { createSystem } from 'core/factories'
import { keys } from 'core/input'
import type { Application } from 'types/pixi';
import { nCameraControl } from '../nodes'
import priorities from './priorities'

const minScale = 0.75
const maxScale = 1.5
const scaleInc = 0.002
const maxScaleInc = 0.1
const damping = 0.9

export default ($config: GameConfig, $engine: Engine, $keyboard: Keyboard, $app: Application) => {
  $keyboard.addKeys(keys.PLUS, keys.MINUS)
  const world = $app.stage.childByName('gameScene')
  let inc = 0

  return (
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

        if ($keyboard.isDown(keys.PLUS)) {
          inc += scaleInc
          inc = Math.min(inc, maxScaleInc)
        } else if ($keyboard.isDown(keys.MINUS)) {
          inc -= scaleInc
          inc = Math.max(inc, -maxScaleInc)
        }

        let scale = world.scale.x + inc
        if (scale > maxScale) scale = maxScale
        else if (scale < minScale) scale = minScale

        world.scale.set(scale)
        inc *= damping
      },
    })(nCameraControl)($engine)
  )
}

export const params = {
  priority: priorities.MOVEMENT,
}
