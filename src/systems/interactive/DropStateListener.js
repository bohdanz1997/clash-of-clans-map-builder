import { useNodes, onNodeAdded } from 'core/ecs'
import * as n from '../../nodes'

export const DropStateListener = ({ map }) => {
  useNodes([n.TargetDroppedListener])

  onNodeAdded((node) => {
    const { dragContext, position, collision } = node

    const layer = map.getLayer('building')

    if (!layer.isEmptyInSize(position.col, position.row, collision.radius)) {
      position.x = dragContext.startPos.x
      position.y = dragContext.startPos.y
    }
  })
}
