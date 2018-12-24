import { system } from 'core/scent'
import * as n from '../nodes'
import { gameConfig } from '../config'

export default ({ engine, keyboard }) => {
  keyboard.start()

  return system((node, delta) => {
    keyboard.update(delta)
  })(n.Keyboard)(engine)
}

export const params = {
  priority: gameConfig.priorities.PRE_UPDATE,
}
