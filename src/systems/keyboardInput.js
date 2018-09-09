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

    motion.vel.x = 0
    motion.vel.y = 0

    if ($keyboard.isDown(keys.W)) {
      motion.vel.y = -control.dy
    }
    if ($keyboard.isDown(keys.S)) {
      motion.vel.y = control.dy
    }
    if ($keyboard.isDown(keys.A)) {
      motion.vel.x = -control.dx
    }
    if ($keyboard.isDown(keys.D)) {
      motion.vel.x = control.dx
    }
  },
})(nControl)($engine)
