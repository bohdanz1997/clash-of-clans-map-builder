import { createSystem } from 'core/scent'
import { gameConfig } from '../config'
import * as n from '../nodes'

export default $engine => createSystem(({ position, collision }) => {
  collision.bounds.setPosition(position.pos)
})(n.Collision)($engine)

export const params = {
  priority: gameConfig.priorities.UPDATE_COLLISION,
}
