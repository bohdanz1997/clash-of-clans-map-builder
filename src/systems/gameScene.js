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

export default ($config: GameConfig, $engine: Engine, $app: Application) => {
  const logger = createLogger('Game Scene')
  const invertMatrix = getIsoMatrix().clone().invert()
  const cursor = tink.makePointer()
  const world = $app.stage.childByName('gameScene')
  const text = spriteUtils.text()

  return createEnhancedSystem({
    initLayers(groundLayerNode, objectLayerNode) {
      const spritesByLayers = [groundLayerNode, objectLayerNode].map(extractSpritesFromNode)
      const containers = spritesByLayers.map(sprites => spriteUtils.group(...sprites))

      containers.forEach(c => world.addChild(c))
      spritesByLayers.forEach((spritesByLayer, index) => logger.log(index, 'layer', spritesByLayer.length, 'items'))
    },

    init(groundLayerNode, objectLayerNode) {
      this.initLayers(groundLayerNode, objectLayerNode)
      $app.stage.addChild(text)
      makeIsoPointer(cursor, world, invertMatrix, $config)
    },

    update() {
      const { position, fieldPosition, isUp, isDown } = cursor
      text.content = `
        x: ${position.x}
        y: ${position.y}
        column: ${fieldPosition.x}
        row: ${fieldPosition.y}
        isUp: ${isUp}
        isDown: ${isDown}
      `
    },
  })(nGroundLayer, nObjectsLayer)($engine)
}

export const params = {
  priority: systemPriorities.PRE_INIT,
}
