// @flow
import type { GameConfig, Engine, Node } from '../types/game'
import type { Application, Sprite } from '../types/pixi'

import { nGroundLayer, nObjectsLayer } from '../nodes'
import { spriteUtils } from '../services'

import { systemPriorities, createLogger } from '../core'
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
  const world = $app.stage.childByName('gameScene')
  const text = spriteUtils.text()

  let groundLayer
  let objectLayer

  return createEnhancedSystem({
    initLayer(node, name) {
      const sprites = extractSpritesFromNode(node)
      const container = spriteUtils.group(...sprites)
      container.name = name
      return container
    },

    initLayers(groundLayerNode, objectLayerNode) {
      groundLayer = this.initLayer(groundLayerNode, 'ground')
      objectLayer = this.initLayer(objectLayerNode, 'object')

      world.addChild(groundLayer, objectLayer)
    },

    init(groundLayerNode, objectLayerNode) {
      this.initLayers(groundLayerNode, objectLayerNode)
      $app.stage.addChild(text)

      objectLayerNode.onAdded(({ display }) => {
        objectLayer.addChild(display.sprite)
      })

      objectLayerNode.onRemoved(({ display }) => {
        objectLayer.removeChild(display.sprite)
      })
    },
  })(nGroundLayer, nObjectsLayer)($engine)
}

export const params = {
  priority: systemPriorities.PRE_INIT,
}
