import * as config from '../config'
import * as n from '../nodes'

const { groups } = config.display

const setDisplayGroup = group => (layerNode) => {
  layerNode.display.group = group
}

const initLayerToGroup = (layerNode, group) => {
  layerNode.each(setDisplayGroup(group))
  layerNode.onAdded(setDisplayGroup(group))
}

export default () => ({
  nodes: [
    n.Layers.Ground,
    n.Layers.BackGround,
    n.Layers.Building,
    n.Layers.Drag,
    n.Layers.Hud,
  ],

  init(groundNode, backNode, buildingNode, dragNode, hudNode) {
    const layersToGroups = [
      [groundNode, groups.GROUND],
      [backNode, groups.OVERLAY],
      [buildingNode, groups.BUILDING],
      [dragNode, groups.DRAG],
      [hudNode, groups.HUD],
    ]

    layersToGroups.forEach(([layerNode, displayGroup]) => {
      initLayerToGroup(layerNode, displayGroup)
    })
  },
})
