import { systemPriorities } from 'core'
import { createSystem } from 'core/factories'
import { nCollision } from '../nodes'
import { Rectangle } from 'core/pixi'

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
  })(nCollision)($engine)
}

export const params = {
  priority: systemPriorities.RESOLVE_COLLISIONS,
}
