import { createSystem } from '../core/factories'
import { nMovement } from '../nodes'

const handler = ({ position, motion }, delta) => {
  position.pos.set(
    position.pos.x + motion.vel.x * delta,
    position.pos.y + motion.vel.y * delta,
  )
}

export default $engine => createSystem(handler)(nMovement)($engine)
