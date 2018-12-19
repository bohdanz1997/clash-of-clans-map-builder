import { createSystem } from 'core/factories'
import { CollisionNode } from '../nodes'
import { gameConfig } from '../config'

export default $engine => createSystem(({ position, collision }) => {
  collision.bounds.setPosition(position.pos)
})(CollisionNode)($engine)

export const params = {
  priority: gameConfig.priorities.UPDATE_COLLISION,
}
