import { system } from 'core/scent'
import { Rectangle } from 'core/pixi'
import { gameConfig } from '../config'
import * as n from '../nodes'

export const BoundsLimiter = ({ engine, map }) => {
  const worldBounds = new Rectangle(0, 0, map.config.widthInPixels, map.config.heightInPixels)

  return system({
    update({ position, collision }) {
      const { bounds } = collision

      if (bounds.top < worldBounds.top) {
        position.pos.y = 0
      }
      if (bounds.bottom > worldBounds.bottom) {
        position.pos.y = worldBounds.bottom - bounds.height
      }
      if (bounds.left < worldBounds.left) {
        position.pos.x = 0
      }
      if (bounds.right > worldBounds.right) {
        position.pos.x = worldBounds.right - bounds.width
      }
    },
  })(n.Collision)(engine)
}

export const params = {
  priority: gameConfig.priorities.RESOLVE_COLLISIONS,
}
