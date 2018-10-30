import { createSystem } from 'core/factories'
import { nInput } from '../nodes'
import { gameConfig } from '../config'

export default ($engine, $keyboard) => {
  $keyboard.start()

  return createSystem((delta) => {
    $keyboard.update(delta)
  })(nInput)($engine)
}

export const params = {
  priority: gameConfig.priorities.PRE_UPDATE,
}
