// @flow
import type { GameConfig, Engine, Node } from '../types/game'
import type { Application, Sprite } from '../types/pixi'

import { nGroundLayer, nObjectsLayer } from '../nodes'
import { spriteUtils, tink } from '../services'

import { systemPriorities, createLogger } from '../core'
import { getIsoMatrix } from '../core/math'
import { makeIsoPointer } from '../core/isometric'
import { createEnhancedSystem } from '../core/factories'

const extractSpritesFromNode = (node: Node): Sprite[] => {
  const sprites = []
  node.each(({ display }) => {
    sprites.push(display.sprite)
  })
  return sprites
}

export default ($config: GameConfig, $engine: Engine, $app: Application) => createEnhancedSystem({
  init(groundLayerNode, objectLayerNode) {
    const logger = createLogger('Game Scene')
    const cursor = tink.makePointer()
    const invertMatrix = getIsoMatrix().clone().invert()
    const worldContainer = $app.stage.childByName('gameScene')

    if (!worldContainer) {
      throw new Error('Could not find \'gameScene\' container in \'app.stage.children\'')
    }

    makeIsoPointer(cursor, worldContainer, invertMatrix, $config)

    cursor.press = () => {
      const { position, fieldPosition } = cursor

      logger.log('x:', position.x, 'y:', position.y)
      logger.log('column:', fieldPosition.x, 'row:', fieldPosition.y)
    }

    const spritesByLayers = [groundLayerNode, objectLayerNode].map(extractSpritesFromNode)
    const containers = spritesByLayers.map(sprites => spriteUtils.group(...sprites))
    containers.forEach(c => worldContainer.addChild(c))
    spritesByLayers.forEach((spritesByLayer, index) => logger.log(index, 'layer', spritesByLayer.length, 'items'))
  },
})(nGroundLayer, nObjectsLayer)($engine)

export const params = {
  priority: systemPriorities.PRE_INIT,
}
