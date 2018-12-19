import { createSystem } from 'core/factories'
import { KeyboardNode } from '../nodes'
import { gameConfig } from '../config'

export default ($engine, $keyboard) => {
  $keyboard.start()

  return createSystem((node, delta) => {
    $keyboard.update(delta)
  })(KeyboardNode)($engine)
}

export const params = {
  priority: gameConfig.priorities.PRE_UPDATE,
}
