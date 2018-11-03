import { createSystem } from 'core/factories'
import { nKeyboard } from '../nodes'
import { gameConfig } from '../config'

export default ($engine, $keyboard) => {
  $keyboard.start()

  return createSystem((node, delta) => {
    $keyboard.update(delta)
  })(nKeyboard)($engine)
}

export const params = {
  priority: gameConfig.priorities.PRE_UPDATE,
}
