import { useNodes, onUpdate, onNodeAdded, onNodeRemoved } from 'core/ecs'
import * as c from '../components'
import * as n from '../nodes'

const ChildOverlayMovement = () => {
  useNodes([n.ParentWithOverlay])

  onUpdate((node) => {
    const { child, position } = node
    const childPosition = child.entity.get(c.Position)

    if (childPosition) {
      childPosition.x = position.x - child.offset.x
      childPosition.y = position.y - child.offset.x
    }
  })
}

const ChildPreviewMovement = ({ map }) => {
  useNodes([n.ParentWithPreview])

  onUpdate((node) => {
    const { child, isoPosition } = node
    const childPosition = child.entity.get(c.Position)

    if (childPosition) {
      childPosition.x = (isoPosition.col * map.config.cellWidth) - child.offset.x
      childPosition.y = (isoPosition.row * map.config.cellWidth) - child.offset.y
    }
  })
}

const ChildDebugMovement = () => {
  useNodes([n.ParentWithDebug, n.Camera])

  onUpdate((nodes, cameraNode) => {
    const camera = cameraNode.head

    nodes.each((node) => {
      const { child, isoPosition } = node
      const childPosition = child.entity.get(c.Position)
      // entity can be disposed
      if (childPosition) {
        childPosition.x = isoPosition.x - camera.position.x - child.offset.x
        childPosition.y = isoPosition.y - camera.position.y - child.offset.y
      }
    })
  })
}

export const ChildMovement = [ChildOverlayMovement, ChildPreviewMovement, ChildDebugMovement]
