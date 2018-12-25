import { system } from 'core/scent'
import { gameConfig } from '../config'
import * as n from '../nodes'

export const OverlayManager = ({ map, engine, entityFactory }) => {

  const createOverlay = ({ position }) => {
    const overlay = entityFactory.create('overlay', {
      width: map.config.tileWidth,
      height: map.config.tileHeight,
      target: position,
    })

    engine.addEntity(overlay)
  }

  const removeOverlay = ({ entity }) => {
    engine.destroyEntity(entity)
  }

  return system({
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
  })(n.Overlay, n.OverlayOwner)(engine)
}

export const params = {
  priority: gameConfig.priorities.UPDATE,
}
