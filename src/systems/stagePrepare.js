// @flow
import type { GameConfig, Engine } from '../types/game'
import type { Application } from '../types/pixi'

import { nLayers } from '../nodes'
import { spriteUtils } from '../services'

import { systemPriorities } from '../core'
import { createEnhancedSystem } from '../core/factories'
import displayGroups, { groupsList, createStage } from '../renderLayers'

export default ($config: GameConfig, $engine: Engine, $app: Application) => {
  const world = $app.stage.childByName('gameScene')
  const text = spriteUtils.text()

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

      $app.stage.addChild(text)
    },
  })(
    nLayers.Ground,
    nLayers.BackGround,
    nLayers.Building,
  )($engine)
}

export const params = {
  priority: systemPriorities.PRE_INIT,
}
