import { systemPriorities } from '../core'
import { createSystem } from '../core/factories'
import { nMovement } from '../nodes'

const handler = ({ position, motion }, delta) => {
  position.pos.add(motion.vel.multNum(delta))
}

export default $engine => createSystem(handler)(nMovement)($engine)

export const params = {
  priority: systemPriorities.MOVEMENT,
}
