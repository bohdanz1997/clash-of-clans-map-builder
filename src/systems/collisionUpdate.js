import { system } from 'core/scent'
import { gameConfig } from '../config'
import * as n from '../nodes'

export const CollisionUpdate = ({ engine }) => system(({ position, collision }) => {
  collision.bounds.setPosition(position.pos)
})(n.Collision)(engine)

export const params = {
  priority: gameConfig.priorities.UPDATE_COLLISION,
}
