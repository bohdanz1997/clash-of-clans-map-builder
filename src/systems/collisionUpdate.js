import { systemPriorities } from 'core'
import { createSystem } from 'core/factories'
import { nCollision } from '../nodes'

export default $engine => createSystem(({ position, collision }) => {
  collision.bounds.setPosition(position.pos)
})(nCollision)($engine)

export const params = {
  priority: systemPriorities.UPDATE_COLLISION,
}
