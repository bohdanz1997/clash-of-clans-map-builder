import { Point } from 'core/pixi'
import * as n from '../nodes'

export default ({ map }) => ({
  nodes: [n.MapLayers.Building, n.MapLayers.Drag],

  init() {
    this.buildingLayer = map.getLayer('building')
    this.dragLayer = map.getLayer('drag')
  },

  updateNodeForLayer: layer => (node) => {
    const { position, identity, collision } = node
    const normPos = Point.floor(Point.divNum(position.pos, map.config.cellWidth))

    if (layer.isEmptyInSize(normPos.x, normPos.y, collision.radius)) {
      layer.setInSize(normPos.x, normPos.y, identity.seed, collision.radius)
    }
  },

  update(buildingNode, dragNode) {
    this.buildingLayer.clear()
    this.dragLayer.clear()

    buildingNode.each(this.updateNodeForLayer(this.buildingLayer))
    dragNode.each(this.updateNodeForLayer(this.dragLayer))
  },
})
