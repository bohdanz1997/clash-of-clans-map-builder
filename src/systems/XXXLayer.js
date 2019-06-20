import * as n from '../nodes'

export const XXXLayer = ({ map }) => ({
  nodes: [n.MapLayers.Building, n.MapLayers.Drag],

  init() {
    this.buildingLayer = map.getLayer('building')
    this.dragLayer = map.getLayer('drag')
  },

  updateNodeForLayer: layer => (node) => {
    const { position, identity, collision } = node

    if (layer.isEmptyInSize(position.col, position.row, collision.radius)) {
      layer.setInSize(position.col, position.row, identity.seed, collision.radius)
    }
  },

  update(buildingNode, dragNode) {
    this.buildingLayer.clear()
    this.dragLayer.clear()

    buildingNode.each(this.updateNodeForLayer(this.buildingLayer))
    dragNode.each(this.updateNodeForLayer(this.dragLayer))
  },
})
