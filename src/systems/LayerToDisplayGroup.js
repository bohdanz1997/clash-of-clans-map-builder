import * as n from '../nodes'

const setDisplayGroup = group => (layerNode) => {
  layerNode.display.group = group
}

const initLayerToGroup = (layerNode, group) => {
  layerNode.each(setDisplayGroup(group))
  layerNode.onAdded(setDisplayGroup(group))
}

/**
 * @param {Config} config
 */
export const LayerToDisplayGroup = ({ config }) => ({
  nodes: [
    n.Layers.Ground,
    n.Layers.BackGround,
    n.Layers.Building,
    n.Layers.Drag,
    n.Layers.Hud,
  ],

  init(groundNode, backNode, buildingNode, dragNode, hudNode) {
    const groups = config.displayGroups

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
