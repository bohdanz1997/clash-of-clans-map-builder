// @flow
import type { GameConfig, Engine } from 'types/game'

import { systemPriorities } from 'core'
import { createEnhancedSystem } from 'core/factories'

import { nBackGround } from '../nodes'
import { Overlay } from '../entities'

export default ($config: GameConfig, $engine: Engine) => createEnhancedSystem({
  init(bgNode) {
    // add overlay for each entity with backGround component
    bgNode.each(({ display, position }) => {
      const overlay = Overlay({
        width: $config.cartTileSize,
        height: $config.cartTileSize,
        target: position,
      })

      $engine.addEntity(overlay)
    })
  },
})(nBackGround)($engine)

export const params = {
  priority: systemPriorities.PRE_INIT,
}
