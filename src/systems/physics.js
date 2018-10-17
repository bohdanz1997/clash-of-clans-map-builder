import { systemPriorities } from '../core'
import { createSystem } from '../core/factories'
import { nPhysics } from '../nodes'

export default $engine => createSystem(({ position, collision }) => {
  collision.bounds.x = position.pos.x
  collision.bounds.y = position.pos.y
})(nPhysics)($engine)

export const params = {
  priority: systemPriorities.PHYSICS,
}
