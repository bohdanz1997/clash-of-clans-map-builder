// @flow
import type { GameConfig, Engine } from 'types/game'

import { createEnhancedSystem } from 'core/factories'
import { nLayers } from '../nodes'
import { viewConfig } from '../config'
import { gameConfig } from '../config'

const { groups } = viewConfig

export default ($config: GameConfig, $engine: Engine) => {
  const initLayer = (node, group) => {
    node.each(({ display }) => {
      display.group = group
    })
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
    nLayers.Ground,
    nLayers.BackGround,
    nLayers.Building,
    nLayers.Drag,
    nLayers.Hud,
  )($engine)
}

export const params = {
  priority: gameConfig.priorities.PRE_INIT,
}
