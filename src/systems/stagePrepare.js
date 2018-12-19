// @flow
import type { GameConfig, Engine } from 'types/game'

import { createEnhancedSystem } from 'core/factories'
import { viewConfig, gameConfig } from '../config'
import { LayersNode } from '../nodes'

const { groups } = viewConfig

export default ($config: GameConfig, $engine: Engine) => {
  const setDisplayGroup = group => ({ display }) => {
    display.group = group
  }

  const initLayer = (node, group) => {
    node.each(setDisplayGroup(group))
    node.onAdded(setDisplayGroup(group))
  }

  return createEnhancedSystem({
    init(groundNode, backNode, buildingNode, dragNode, hudNode) {
      initLayer(groundNode, groups.GROUND)
      initLayer(backNode, groups.OVERLAY)
      initLayer(buildingNode, groups.BUILDING)
      initLayer(dragNode, groups.DRAG)
      initLayer(hudNode, groups.HUD)
    },
  })(
    LayersNode.Ground,
    LayersNode.BackGround,
    LayersNode.Building,
    LayersNode.Drag,
    LayersNode.Hud,
  )($engine)
}

export const params = {
  priority: gameConfig.priorities.PRE_INIT,
}
