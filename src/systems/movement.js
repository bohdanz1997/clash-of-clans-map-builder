import { createSystem } from 'core/factories'
import { nMovement } from '../nodes'
import priorities from './priorities'

export default $engine => createSystem(({ position, motion }, delta) => {
  position.pos.add(motion.vel.multNum(delta))
})(nMovement)($engine)

export const params = {
  priority: priorities.MOVEMENT,
}
