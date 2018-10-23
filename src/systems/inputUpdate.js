import { systemPriorities } from 'core'
import { createSystem } from 'core/factories'
import { nInput } from '../nodes'

export default ($engine, $keyboard) => {
  $keyboard.start()

  return createSystem((delta) => {
    $keyboard.update(delta)
  })(nInput)($engine)
}

export const params = {
  priority: systemPriorities.PRE_UPDATE,
}
