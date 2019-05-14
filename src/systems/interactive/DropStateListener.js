import * as c from 'app/components'
import * as n from 'app/nodes'

export default ({ map }) => ({
  nodes: [n.SourceDroppedListener],

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
