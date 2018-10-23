import { createSystem } from 'core/factories'
import { nInput } from '../nodes'
import priorities from './priorities'

export default ($engine, $keyboard) => {
  $keyboard.start()

  return createSystem((delta) => {
    $keyboard.update(delta)
  })(nInput)($engine)
}

export const params = {
  priority: priorities.PRE_UPDATE,
}
