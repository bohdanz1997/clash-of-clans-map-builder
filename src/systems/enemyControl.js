import { createSystem } from '../core/factories'
import { nEnemyControl } from '../nodes'
import { randomInt } from '../core/util'

export default ($engine) => createSystem({
  update(nodeItem, delta) {
    const { intelect } = nodeItem
    intelect.timer += delta
    if (intelect.timer > intelect.maxTime) {
      intelect.timer = 0
      this.updateState(nodeItem)
    }
  },

  updateState({ control, motion }) {
    motion.vx = 0
    motion.vy = 0

    if (randomInt(0, 100) > 50) {
      // move up
      if (randomInt(0, 100) > 50) {
        // move left
        motion.vx = -control.dx
      } else {
        // move right
        motion.vx = control.dx
      }
    } else {
      // move down
      if (randomInt(0, 100) > 50) {
        // move left
        motion.vy = -control.dy
      } else {
        // move right
        motion.vy = control.dy
      }
    }
  },
})(nEnemyControl)($engine)
