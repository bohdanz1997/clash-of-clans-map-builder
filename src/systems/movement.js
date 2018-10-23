import { systemPriorities } from 'core'
import { createSystem } from 'core/factories'
import { nMovement } from '../nodes'

export default $engine => createSystem(({ position, motion }, delta) => {
  position.pos.add(motion.vel.multNum(delta))
})(nMovement)($engine)

export const params = {
  priority: systemPriorities.MOVEMENT,
}
