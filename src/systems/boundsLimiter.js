import { createSystem } from 'core/factories'
import { Rectangle } from 'core/pixi'
import { CollisionNode } from '../nodes'
import { gameConfig } from '../config'

export default ($engine, $config) => {
  const worldBounds = new Rectangle(0, 0, $config.cartWorldWidth, $config.cartWorldHeight)

  return createSystem({
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
  })(CollisionNode)($engine)
}

export const params = {
  priority: gameConfig.priorities.RESOLVE_COLLISIONS,
}
