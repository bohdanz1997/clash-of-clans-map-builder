import { Rectangle } from 'pixi.js'
import { useNodes, onUpdate } from 'core/ecs'
import * as n from '../nodes'

/**
 * @param {TileMap} map
 */
export const KeepInBounds = ({ map }) => {
  const worldBounds = new Rectangle(0, 0, map.config.widthInPixels, map.config.heightInPixels)

  useNodes([n.InBounds])

  onUpdate(({ position, collision }) => {
    const { bounds } = collision

    if (bounds.top < worldBounds.top) {
      position.y = 0
    }
    if (bounds.bottom > worldBounds.bottom) {
      position.y = worldBounds.bottom - bounds.height
    }
    if (bounds.left < worldBounds.left) {
      position.x = 0
    }
    if (bounds.right > worldBounds.right) {
      position.x = worldBounds.right - bounds.width
    }
  })
}
