import { useNodes, onUpdate } from 'core/ecs'
import * as n from '../nodes'

/**
 * @param {TileMap} map
 */
export const Movement = ({ map }) => {
  const cellSize = map.config.cellWidth

  useNodes([n.Movement])

  onUpdate(({ position, motion }, delta) => {
    position.x += motion.vel.x * delta
    position.y += motion.vel.y * delta

    position.col = Math.round(position.x / cellSize)
    position.row = Math.round(position.y / cellSize)
  })
}
