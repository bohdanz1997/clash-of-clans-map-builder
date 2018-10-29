import { createSystem } from 'core/factories'
import { Point } from 'core/pixi'
import { nMovement } from '../nodes'
import priorities from './priorities'

export default ($engine, $config) => createSystem(({ position, motion }, delta) => {
  position.pos.add(motion.vel.multNum(delta))

  const fieldPos = Point.divNum(position.pos, $config.cartCellSize).floor()
  position.fieldPos.copy(fieldPos)
})(nMovement)($engine)

export const params = {
  priority: priorities.MOVEMENT,
}
