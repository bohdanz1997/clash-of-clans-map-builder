import { createSystem } from 'core/factories'
import { nCollision } from '../nodes'
import priorities from './priorities'

export default $engine => createSystem(({ position, collision }) => {
  collision.bounds.setPosition(position.pos)
})(nCollision)($engine)

export const params = {
  priority: priorities.UPDATE_COLLISION,
}
