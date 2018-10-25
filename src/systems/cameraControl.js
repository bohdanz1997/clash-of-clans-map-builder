// @flow
import type { GameConfig, Engine, Keyboard } from 'types/game'
import type { Application } from 'types/pixi'

import { keys } from 'core/input'
import { keepInRanges } from 'core/util'
import { createSystem } from 'core/factories'
import priorities from './priorities'
import { nCameraControl } from '../nodes'

const createSmoothSpeed = ({ minRange, maxRange, increment, maxSpeed, damping }) => {
  let speed = 0

  return {
    applySpeedTo(value) {
      speed *= damping
      return keepInRanges(minRange, maxRange, value + speed)
    },

    increase() {
      speed += increment
      speed = Math.min(speed, maxSpeed)
    },

    decrease() {
      speed -= increment
      speed = Math.max(speed, -maxSpeed)
    },
  }
}

export default ($config: GameConfig, $engine: Engine, $keyboard: Keyboard, $app: Application) => {
  $keyboard.addKeys(keys.PLUS, keys.MINUS)
  const world = $app.stage.childByName('gameScene')

  const smoothSpeed = createSmoothSpeed({
    minRange: 0.75,
    maxRange: 1.5,
    increment: 0.002,
    damping: 0.9,
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

        if ($keyboard.isDown(keys.PLUS)) {
          smoothSpeed.increase()
        } else if ($keyboard.isDown(keys.MINUS)) {
          smoothSpeed.decrease()
        }

        const scale = smoothSpeed.applySpeedTo(world.scale.x)
        world.scale.set(scale)
      },
    })(nCameraControl)($engine)
  )
}

export const params = {
  priority: priorities.MOVEMENT,
}
