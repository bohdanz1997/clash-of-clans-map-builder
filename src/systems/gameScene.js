// @flow
import type { GameConfig, Engine, Node } from '../types/game'
import type { Application, Sprite } from '../types/pixi'

import { createLogger, systemPriorities } from '../core'
import { createEnhancedSystem } from '../core/factories'
import { nGroundLayer, nObjectsLayer } from '../nodes'
import { spriteUtils } from '../services'

const extractSpritesFromNode = (node: Node): Sprite[] => {
  const sprites = []
  node.each(({ display }) => {
    sprites.push(display.sprite)
  })
  return sprites
}

export default ($config: GameConfig, $engine: Engine, $app: Application) => createEnhancedSystem({
  init(groundLayerNode, objectLayerNode) {
    const worldOffsetX = $config.hWidth - $config.hTileWidth
    const log = createLogger('Game Scene')

    const worldContainer = $app.stage.childByName('gameScene')
    if (!worldContainer) {
      throw new Error('Could not find \'gameScene\' container in \'app.stage.children\'')
    }

    const spritesByLayers = [groundLayerNode, objectLayerNode].map(extractSpritesFromNode)
    const containers = spritesByLayers.map(sprites => spriteUtils.group(...sprites))

    containers.forEach(c => worldContainer.addChild(c))
    $app.stage.x += worldOffsetX
  },
})(nGroundLayer, nObjectsLayer)($engine)

export const params = {
  priority: systemPriorities.PRE_INIT,
}
