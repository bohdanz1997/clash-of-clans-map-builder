import * as c from '@app/components'
import * as n from '@app/nodes'

export default ({ map }) => ({
  nodes: [n.DropObserver],

  init(nodes) {
    nodes.onAdded((node) => {
      const { source, dragContext } = node

      const layer = map.getLayer('building')
      const position = source.entity.get(c.Position)
      const collision = source.entity.get(c.Collision)

      if (!layer.isEmptyInSize(position.col, position.row, collision.radius)) {
        position.x = dragContext.startPos.x
        position.y = dragContext.startPos.y

        position.pos.set(position.x, position.y)
      }
    })
  },
})
