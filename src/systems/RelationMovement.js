import * as c from '../components'
import * as n from '../nodes'

export const ChildOverlayMovement = () => ({
  nodes: [n.ChildOverlayMovement],

  update(node) {
    const { child, position } = node
    const childPosition = child.entity.get(c.Position)

    childPosition.x = position.x
    childPosition.y = position.y
  },
})

export const ChildPreviewMovement = ({ map }) => ({
  nodes: [n.ChildPreviewMovement],

  init() {
    this.cellSize = map.config.cellWidth
  },

  update(node) {
    const { child, isoPosition } = node
    const childPosition = child.entity.get(c.Position)

    childPosition.x = (isoPosition.col * this.cellSize) - child.offset.x
    childPosition.y = (isoPosition.row * this.cellSize) - child.offset.y
  },
})
