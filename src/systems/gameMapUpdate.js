import { createEnhancedSystem } from 'core/scent'
import { Point } from 'core/pixi'
import { MapNode, MapLayersNode } from '../nodes'

export default ($engine, $config) => {
  const updateNodeForLayer = layer => (node) => {
    const { position, identity, collision } = node
    const normPos = Point.floor(Point.divNum(position.pos, $config.cartCellSize))

    if (layer.isEmptyInSize(normPos.x, normPos.y, collision.sizeInCells)) {
      layer.setInSize(normPos.x, normPos.y, identity.seed, collision.sizeInCells)
    }
  }

  let buildingLayer
  let dragLayer

  return createEnhancedSystem({
    init(mapNode) {
      const { gameField } = mapNode.head.map

      buildingLayer = gameField.getLayer('building')
      dragLayer = gameField.getLayer('drag')
    },

    update(mapNode, buildingNode, dragNode) {
      buildingLayer.clear()
      dragLayer.clear()

      buildingNode.each(updateNodeForLayer(buildingLayer))
      dragNode.each(updateNodeForLayer(dragLayer))
    },
  })(MapNode, MapLayersNode.Building, MapLayersNode.Drag)($engine)
}

export const params = {
  enabled: true,
}
