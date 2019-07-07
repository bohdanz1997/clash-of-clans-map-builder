import { useNodes, onNodeAdded } from 'core/ecs'
import * as n from '../../nodes'

/**
 * @param {TileMap} map
 */
export const DropStateListener = ({ map }) => {
  useNodes([n.TargetDroppedListener])

  const layer = map.getLayer('building')

  onNodeAdded((node) => {
    const { dragContext, position, collision } = node

    if (!layer.isEmptyInSize(position.col, position.row, collision.size)) {
      position.x = dragContext.startPos.x
      position.y = dragContext.startPos.y
    }
  })
}
