// @flow
import type { GameConfig, Engine } from '../types/game'
import type { Application } from '../types/pixi'

import { nBackGround } from '../nodes'

import { systemPriorities } from '../core'
import { createEnhancedSystem } from '../core/factories'

import Overlay from '../entities/overlay'

export default ($config: GameConfig, $engine: Engine, $app: Application) => {

  return createEnhancedSystem({
    init(bgNode) {
      // add overlay for each entity with backGround component
      bgNode.each(({ display, position }) => {
        const overlay = Overlay({
          width: $config.hTileWidth,
          height: $config.hTileWidth,
          target: position,
        })

        $engine.addEntity(overlay)
      })
    },
  })(nBackGround)($engine)
}

export const params = {
  priority: systemPriorities.PRE_INIT,
}
