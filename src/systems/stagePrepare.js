// @flow
import type { GameConfig, Engine } from 'types/game'
import type { Application, Container } from 'types/pixi'

import { createEnhancedSystem } from 'core/factories'

import { nLayers } from '../nodes'

import displayGroups, { groupsList, createStage } from '../renderLayers'
import priorities from './priorities'

export default ($config: GameConfig, $engine: Engine, $app: Application) => {
  const world: Container = $app.stage.childByName('world')
  const hud: Container = $app.stage.childByName('hud')
  const stage = createStage(groupsList)

  stage.addChild(world, hud)
  $app.stage = stage

  const initLayer = (node, group) => {
    node.each(({ display }) => {
      display.group = group
    })
  }

  return createEnhancedSystem({
    init(groundNode, backNode, buildingNode, dragNode, hudNode) {
      initLayer(groundNode, displayGroups.GROUND)
      initLayer(backNode, displayGroups.OVERLAY)
      initLayer(buildingNode, displayGroups.BUILDING)
      initLayer(dragNode, displayGroups.DRAG)
      initLayer(hudNode, displayGroups.HUD)
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
  priority: priorities.PRE_INIT,
}
