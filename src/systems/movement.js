import { createSystem } from '../core/factories'
import { nMovement } from '../nodes'

const handler = ({ position, motion }, delta) => {
  position.pos = position.pos.add(motion.vel.mult(delta))
}

export default $engine => createSystem(handler)(nMovement)($engine)
