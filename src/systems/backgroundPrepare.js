// @flow
import type { GameConfig, Engine } from '../types/game'

import { nBackGround } from '../nodes'
import { Overlay } from '../entities'
import { systemPriorities } from '../core'
import { createEnhancedSystem } from '../core/factories'

export default ($config: GameConfig, $engine: Engine) => createEnhancedSystem({
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

export const params = {
  priority: systemPriorities.PRE_INIT,
}
