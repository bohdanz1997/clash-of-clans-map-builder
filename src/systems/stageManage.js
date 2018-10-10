// @flow
import type { GameConfig, Engine } from '../types/game'
import type { Application, Container } from '../types/pixi'

import { createLogger, systemPriorities } from '../core'
import * as PIXI from '../core/pixi'
import { createEnhancedSystem } from '../core/factories'
import { nGroundLayer, nObjectsLayer } from '../nodes'

export default ($config: GameConfig, $engine: Engine, $app: Application) => (
  createEnhancedSystem({
    init(groundLayerNode, objectLayerNode) {
      const logger = createLogger('StageManageSystem')
      const worldOffsetX = $config.hWidth - $config.hTileWidth
      const groundLayer = new PIXI.Container()
      const objectsLayer = new PIXI.Container()

      const addSpriteToLayer = (layer: Container) => ({ display }) => {
        layer.addChild(display.sprite)
      }

      groundLayerNode.each(addSpriteToLayer(groundLayer))
      objectLayerNode.each(addSpriteToLayer(objectsLayer))

      $app.stage.x += worldOffsetX
      $app.stage.addChild(groundLayer)
      $app.stage.addChild(objectsLayer)

      logger.log('ground layer: added', groundLayerNode.size, 'render items')
    },
  })(nGroundLayer, nObjectsLayer)($engine)
)

export const params = {
  priority: systemPriorities.PRE_INIT,
}
