import { createSystem } from '../core/factories'
import { nControl } from '../nodes'
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

    motion.vx = 0
    motion.vy = 0

    if ($keyboard.isDown(keys.W)) {
      motion.vy = -control.dy
    }
    if ($keyboard.isDown(keys.S)) {
      motion.vy = control.dy
    }
    if ($keyboard.isDown(keys.A)) {
      motion.vx = -control.dx
    }
    if ($keyboard.isDown(keys.D)) {
      motion.vx = control.dx
    }
  },
})(nControl)($engine)
