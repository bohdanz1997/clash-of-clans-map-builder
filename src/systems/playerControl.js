import { createSystem } from '../core/factories'
import { nPlayerControl } from '../nodes'
import {
  Keyboard,
  keyCodes as keys,
} from '../core/input'

/**
 * @param $engine
 * @param {Keyboard} $keyboard
 */
export default ($engine, $keyboard) => {
  const [kW, kA, kS, kD] = $keyboard.addKeys(
    keys.W, keys.A, keys.S, keys.D
  )

  return createSystem({
    init() {
      $keyboard.start()
    },

    update({ control, motion }, delta) {
      $keyboard.update(delta)
      motion.vel.set(0, 0)

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
  })(nPlayerControl)($engine)
}
