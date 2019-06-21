import * as n from '../../nodes'

export const DropStateListener = ({ map }) => ({
  nodes: [n.TargetDroppedListener],

  init(nodes) {
    nodes.onAdded((node) => {
      const { dragContext, position, collision } = node

      const layer = map.getLayer('building')

      if (!layer.isEmptyInSize(position.col, position.row, collision.radius)) {
        position.x = dragContext.startPos.x
        position.y = dragContext.startPos.y
      }
    })
  },
})
