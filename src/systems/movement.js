import { system } from 'core/scent'
import { Point } from 'core/pixi'
import { gameConfig } from '../config'
import * as n from '../nodes'

export default ($engine, $config) => system(({ position, motion }, delta) => {
  position.pos.add(motion.vel.multNum(delta))

  const fieldPos = Point.divNum(position.pos, $config.cartCellSize).floor()
  position.fieldPos.copy(fieldPos)
})(n.Movement)($engine)

export const params = {
  priority: gameConfig.priorities.MOVEMENT,
}
