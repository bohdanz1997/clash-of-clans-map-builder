// @flow
import type { GameConfig, Engine } from 'types/game'
import type { Application } from 'types/pixi'

import { createEnhancedSystem } from 'core/factories'

import { nLayers } from '../nodes'

import displayGroups, { groupsList, createStage } from '../renderLayers'
import priorities from './priorities'

export default ($config: GameConfig, $engine: Engine, $app: Application) => {
  const world = $app.stage.childByName('world')
  const stage = createStage(groupsList)
  stage.addChild(world)
  $app.stage = stage

  const initLayer = (node, group, name) => {
    node.each(({ display }) => {
      display.group = group
    })
  }

  return createEnhancedSystem({
    init(groundNode, backNode, buildingNode, dragNode) {
      initLayer(groundNode, displayGroups.GROUND, 'ground')
      initLayer(backNode, displayGroups.OVERLAY, 'back')
      initLayer(buildingNode, displayGroups.BUILDING, 'building')
      initLayer(dragNode, displayGroups.DRAG, 'drag')
    },
  })(
    nLayers.Ground,
    nLayers.BackGround,
    nLayers.Building,
    nLayers.Drag,
  )($engine)
}

export const params = {
  priority: priorities.PRE_INIT,
}
