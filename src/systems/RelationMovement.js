import * as c from '../components'
import * as n from '../nodes'

const ChildOverlayMovement = () => ({
  nodes: [n.ParentWithOverlay],

  update(node) {
    const { child, position } = node
    const childPosition = child.entity.get(c.Position)

    childPosition.x = position.x - child.offset.x
    childPosition.y = position.y - child.offset.x
  },
})

const ChildPreviewMovement = ({ map }) => ({
  nodes: [n.ParentWithPreview],

  update(node) {
    const { child, isoPosition } = node
    const childPosition = child.entity.get(c.Position)

    childPosition.x = (isoPosition.col * map.config.cellWidth) - child.offset.x
    childPosition.y = (isoPosition.row * map.config.cellWidth) - child.offset.y
  },
})

const ChildDebugMovement = () => ({
  nodes: [n.ParentWithDebug, n.Camera],

  update(nodes, cameraNode) {
    const camera = cameraNode.head

    nodes.each((node) => {
      const { child, isoPosition } = node
      const childPosition = child.entity.get(c.Position)

      childPosition.x = isoPosition.x - camera.position.x - child.offset.x
      childPosition.y = isoPosition.y - camera.position.y - child.offset.y
    })
  },
})

export const ChildMovement = [ChildOverlayMovement, ChildPreviewMovement, ChildDebugMovement]
