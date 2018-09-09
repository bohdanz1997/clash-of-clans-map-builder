import { createSystem } from '../core/factories'
import { nPhysics } from '../nodes'

const handler = ({ position, collision }) => {
  collision.bounds.x = position.pos.x
  collision.bounds.y = position.pos.y
}

export default $engine => createSystem(handler)(nPhysics)($engine)
