// @flow
import type { GameConfig, Engine } from 'types/game'

import { createEnhancedSystem } from 'core/scent'
import { gameConfig } from '../config'
import * as n from '../nodes'

export default ($config: GameConfig, $engine: Engine, $entityFactory) => {

  const createOverlay = ({ position }) => {
    const overlay = $entityFactory.create('overlay', {
      width: $config.cartTileSize,
      height: $config.cartTileSize,
      target: position,
    })

    $engine.addEntity(overlay)
  }

  const removeOverlay = ({ entity }) => {
    $engine.destroyEntity(entity)
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
  })(n.Overlay, n.OverlayOwner)($engine)
}

export const params = {
  priority: gameConfig.priorities.UPDATE,
}
