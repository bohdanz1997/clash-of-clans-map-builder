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
export default ($engine, $keyboard) => createSystem({
  init() {
    $keyboard.addKeys(keys.W, keys.A, keys.S, keys.D)
    $keyboard.start()
  },

  update({ control, motion }, delta) {
    $keyboard.update(delta)
    motion.vel.set(0, 0)

    if ($keyboard.isDown(keys.W)) {
      motion.vel.set(0, -control.dy)
    }
    if ($keyboard.isDown(keys.S)) {
      motion.vel.set(0, control.dy)
    }
    if ($keyboard.isDown(keys.A)) {
      motion.vel.set(-control.dx, 0)
    }
    if ($keyboard.isDown(keys.D)) {
      motion.vel.set(control.dx, 0)
    }
  },
})(nPlayerControl)($engine)
