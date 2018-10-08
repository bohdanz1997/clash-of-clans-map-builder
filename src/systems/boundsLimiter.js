import { createSystem } from '../core/factories'
import { nBoundsLimiter } from '../nodes'
import { Rectangle } from '../core/pixi'

export default ($engine, $config) => createSystem({
  init() {
    this.screenBounds = new Rectangle(0, 0, $config.width, $config.height)
  },

  update({ position, collision, motion, control }) {
    const { screenBounds } = this
    const { bounds } = collision

    if (bounds.top < screenBounds.top) {
      motion.vel.y = control.dy
    }
    if (bounds.bottom > screenBounds.bottom) {
      motion.vel.y = -control.dy
    }
    if (bounds.left < screenBounds.left) {
      motion.vel.x = control.dx
    }
    if (bounds.right > screenBounds.right) {
      motion.vel.x = -control.dx
    }
  },
})(nBoundsLimiter)($engine)
