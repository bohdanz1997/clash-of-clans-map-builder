import { Point } from 'core/pixi'
import * as n from '../nodes'

/**
 * @param {TileMap} map
 */
export default ({ map }) => ({
  nodes: [n.Movement],

  init() {
    this.cellSize = map.config.cellWidth
  },

  update({ position, motion }, delta) {
    position.pos.add(motion.vel.multNum(delta))

    const fieldPos = Point.divNum(position.pos, this.cellSize).floor()
    position.fieldPos.copy(fieldPos)

    /** ***************** */

    position.x += motion.vel.x * delta
    position.y += motion.vel.y * delta

    position.col = Math.floor(position.x / this.cellSize)
    position.row = Math.floor(position.y / this.cellSize)
  },
})
