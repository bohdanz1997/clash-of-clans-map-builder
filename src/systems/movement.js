import { createSystem } from '../core/factories'
import { nMovement } from '../nodes'

const handler = ({ position, motion }, delta) => {
  position.pos.set(
    position.pos.x + motion.vx * delta,
    position.pos.y + motion.vy * delta,
  )
}

export default $engine => createSystem(handler)(nMovement)($engine)
