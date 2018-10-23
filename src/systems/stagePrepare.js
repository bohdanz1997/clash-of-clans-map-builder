// @flow
import type { GameConfig, Engine } from 'types/game'
import type { Application } from 'types/pixi'

import { createEnhancedSystem } from 'core/factories'

import { nLayers } from '../nodes'

import displayGroups, { groupsList, createStage } from '../renderLayers'
import priorities from './priorities'

export default ($config: GameConfig, $engine: Engine, $app: Application) => {
  const world = $app.stage.childByName('gameScene')
  const stage = createStage(groupsList)
  stage.addChild(world)
  $app.stage = stage

  const initLayer = (node, group) => {
    node.each(({ display }) => {
      display.group = group
      world.addChild(display.sprite)
    })

    node.onAdded(({ display }) => world.addChild(display.sprite))
    node.onRemoved(({ display }) => world.removeChild(display.sprite))
  }

  return createEnhancedSystem({
    init(groundNode, backNode, buildingNode) {
      initLayer(groundNode, displayGroups.GROUND)
      initLayer(backNode, displayGroups.OVERLAY)
      initLayer(buildingNode, displayGroups.BUILDING)
    },
  })(
    nLayers.Ground,
    nLayers.BackGround,
    nLayers.Building,
  )($engine)
}

export const params = {
  priority: priorities.PRE_INIT,
}
