// @flow
import type { GameConfig, Engine } from 'types/game'

import { system } from 'core/scent'
import { viewConfig, gameConfig } from '../config'
import * as n from '../nodes'

const { groups } = viewConfig

export default ($config: GameConfig, $engine: Engine) => {
  const setDisplayGroup = group => ({ display }) => {
    display.group = group
  }

  const initLayer = (node, group) => {
    node.each(setDisplayGroup(group))
    node.onAdded(setDisplayGroup(group))
  }

  system({
    init(groundNode, backNode, buildingNode, dragNode, hudNode) {
      initLayer(groundNode, groups.GROUND)
      initLayer(backNode, groups.OVERLAY)
      initLayer(buildingNode, groups.BUILDING)
      initLayer(dragNode, groups.DRAG)
      initLayer(hudNode, groups.HUD)
    },
  })(
    n.Layers.Ground,
    n.Layers.BackGround,
    n.Layers.Building,
    n.Layers.Drag,
    n.Layers.Hud,
  )($engine)
}

export const params = {
  priority: gameConfig.priorities.PRE_INIT,
}
