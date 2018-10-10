// @flow
import type { GameConfig, Engine } from '../types/game'
import type { Application } from '../types/pixi'

import { createLogger, systemPriorities } from '../core'
import { Container } from '../core/pixi'
import { createEnhancedSystem } from '../core/factories'
import { nGroundLayer } from '../nodes'

export default ($config: GameConfig, $engine: Engine, $app: Application) => (
  createEnhancedSystem({
    init(groundLayerNode) {
      const logger = createLogger('StageManageSystem')
      const worldOffsetX = $config.hWidth - $config.hTileWidth
      const groundLayer = new Container()

      const addSpriteToStage = ({ display }) => {
        groundLayer.addChild(display.sprite)
      }

      groundLayerNode.each(addSpriteToStage)
      $app.stage.x += worldOffsetX
      $app.stage.addChild(groundLayer)

      logger.log('ground layer: added', groundLayerNode.size, 'render items')
    },
  })(nGroundLayer)($engine)
)

export const params = {
  priority: systemPriorities.PRE_INIT,
}
