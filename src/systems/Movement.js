import { Point } from 'core/pixi'
import * as n from '../nodes'

export default ({ map }) => ({
  nodes: [n.Movement],

  update({ position, motion }, delta) {
    position.pos.add(motion.vel.multNum(delta))

    const fieldPos = Point.divNum(position.pos, map.config.cellWidth).floor()
    position.fieldPos.copy(fieldPos)
  },
})
