import * as n from '../nodes'

/**
 * @param {TileMap} map
 */
export const Movement = ({ map }) => ({
  nodes: [n.Movement],

  init() {
    this.cellSize = map.config.cellWidth
  },

  update({ position, motion }, delta) {
    position.x += motion.vel.x * delta
    position.y += motion.vel.y * delta

    position.col = Math.round(position.x / this.cellSize)
    position.row = Math.round(position.y / this.cellSize)
  },
})
