import { createSystem } from 'core/factories'
import { nCollision } from '../nodes'
import { gameConfig } from '../config'

export default $engine => createSystem(({ position, collision }) => {
  collision.bounds.setPosition(position.pos)
})(nCollision)($engine)

export const params = {
  priority: gameConfig.priorities.UPDATE_COLLISION,
}
