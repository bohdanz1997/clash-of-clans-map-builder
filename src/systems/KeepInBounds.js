import { Rectangle } from 'pixi.js'
import * as n from '../nodes'

export const KeepInBounds = ({ map }) => ({
  nodes: [n.InBounds],

  init() {
    this.worldBounds = new Rectangle(0, 0, map.config.widthInPixels, map.config.heightInPixels)
  },

  update({ position, collision }) {
    const { bounds } = collision

    if (bounds.top < this.worldBounds.top) {
      position.y = 0
    }
    if (bounds.bottom > this.worldBounds.bottom) {
      position.y = this.worldBounds.bottom - bounds.height
    }
    if (bounds.left < this.worldBounds.left) {
      position.x = 0
    }
    if (bounds.right > this.worldBounds.right) {
      position.x = this.worldBounds.right - bounds.width
    }
  },
})
