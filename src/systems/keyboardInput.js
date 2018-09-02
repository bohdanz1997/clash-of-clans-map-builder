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

  update({ control }, delta) {
    $keyboard.update(delta)

    if ($keyboard.isDown(keys.W)) {
      // console.log('yes')
    } else {
      // console.log('no')
    }
  },
})(nControl)($engine)
