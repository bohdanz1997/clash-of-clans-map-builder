import { system } from 'core/scent'
import { Point } from 'core/pixi'
import * as n from '../nodes'

export default ({ engine, map }) => {
  const updateNodeForLayer = layer => (node) => {
    const { position, identity, collision } = node
    const normPos = Point.floor(Point.divNum(position.pos, map.config.cellWidth))

    if (layer.isEmptyInSize(normPos.x, normPos.y, collision.radius)) {
      layer.setInSize(normPos.x, normPos.y, identity.seed, collision.radius)
    }
  }

  let buildingLayer
  let dragLayer

  return system({
    init() {
      buildingLayer = map.getLayer('building')
      dragLayer = map.getLayer('drag')
    },

    update(buildingNode, dragNode) {
      buildingLayer.clear()
      dragLayer.clear()

      buildingNode.each(updateNodeForLayer(buildingLayer))
      dragNode.each(updateNodeForLayer(dragLayer))
    },
  })(n.MapLayers.Building, n.MapLayers.Drag)(engine)
}

export const params = {
  enabled: true,
}
