import { useNodes, onUpdate } from 'core/ecs'
import * as n from '../nodes'

export const XXXLayer = ({ map }) => {
  useNodes([n.MapLayers.Building, n.MapLayers.Drag])

  const buildingLayer = map.getLayer('building')
  const dragLayer = map.getLayer('drag')

  const updateNodeForLayer = layer => (node) => {
    const { position, identity, collision } = node

    if (layer.isEmptyInSize(position.col, position.row, collision.radius)) {
      layer.setInSize(position.col, position.row, identity.seed, collision.radius)
    }
  }

  onUpdate((buildingNode, dragNode) => {
    buildingLayer.clear()
    dragLayer.clear()

    buildingNode.each(updateNodeForLayer(buildingLayer))
    dragNode.each(updateNodeForLayer(dragLayer))
  })
}
