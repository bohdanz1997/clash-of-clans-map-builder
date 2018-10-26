// @flow
import type { GameConfig, Engine, Keyboard } from 'types/game'
import type { Application } from 'types/pixi'

import { keys } from 'core/input'
import { createSystem } from 'core/factories'
import { createSmoothStep } from 'core/tools'
import priorities from './priorities'
import { nCameraControl } from '../nodes'

export default ($config: GameConfig, $engine: Engine, $keyboard: Keyboard, $app: Application) => {
  const [keyZoomPlus, keyZoomMinus] = $keyboard.addKeys(keys.ZERO, keys.NINE)
  const world = $app.stage.childByName('gameScene')

  const smoothZoom = createSmoothStep({
    step: 0.002,
    damping: 0.9,
    maxForce: 0.15,
    minRange: 0.75,
    maxRange: 1.5,
  })

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

        if (keyZoomPlus.isDown) {
          smoothZoom.increase()
        } else if (keyZoomMinus.isDown) {
          smoothZoom.decrease()
        }

        const scale = smoothZoom.applyForce(world.scale.x)
        world.scale.set(scale)
      },
    })(nCameraControl)($engine)
  )
}

export const params = {
  priority: priorities.MOVEMENT,
}
