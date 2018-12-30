import * as config from '../config'
import * as n from '../nodes'

const { groups } = config.display

export default () => ({
  nodes: [
    n.Layers.Ground,
    n.Layers.BackGround,
    n.Layers.Building,
    n.Layers.Drag,
    n.Layers.Hud,
  ],

  init(groundNode, backNode, buildingNode, dragNode, hudNode) {
    const setDisplayGroup = group => ({ display }) => {
      display.group = group
    }

    const initLayer = (node, group) => {
      node.each(setDisplayGroup(group))
      node.onAdded(setDisplayGroup(group))
    }

    initLayer(groundNode, groups.GROUND)
    initLayer(backNode, groups.OVERLAY)
    initLayer(buildingNode, groups.BUILDING)
    initLayer(dragNode, groups.DRAG)
    initLayer(hudNode, groups.HUD)
  },
})
