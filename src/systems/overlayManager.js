// @flow
import type { GameConfig, Engine } from 'types/game'

import { createEnhancedSystem } from 'core/factories'

import { OverlayOwnerNode, OverlayNode } from '../nodes'
import { Overlay } from '../entities'
import { gameConfig } from '../config'

export default ($config: GameConfig, $engine: Engine) => {

  const createOverlay = ({ position }) => {
    const overlay = Overlay({
      width: $config.cartTileSize,
      height: $config.cartTileSize,
      target: position,
    })

    $engine.addEntity(overlay)
  }

  const removeOverlay = ({ entityRef }) => {
    $engine.destroyEntity(entityRef)
  }

  return createEnhancedSystem({
    init(overlayNode, ownerNode) {
      ownerNode.each(createOverlay)
      ownerNode.onAdded(createOverlay)
      ownerNode.onRemoved(removeOverlay)
    },

    update(overlayNode) {
      overlayNode.each(({ overlay, position }) => {
        position.pos.copy(overlay.target.pos)
      })
    },
  })(OverlayNode, OverlayOwnerNode)($engine)
}

export const params = {
  priority: gameConfig.priorities.UPDATE,
}
