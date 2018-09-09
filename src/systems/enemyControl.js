import { createSystem } from '../core/factories'
import { nEnemyControl } from '../nodes'
import { randomInt } from '../core/util'

export default ($engine) => createSystem({
  update(nodeItem, delta) {
    const { brain } = nodeItem
    brain.timer += delta
    if (brain.timer > brain.currentMaxTime) {
      brain.timer = 0
      brain.currentMaxTime = randomInt(brain.maxTime / 2, brain.maxTime)
      this.updateState(nodeItem)
    }
  },

  updateState({ control, motion }) {
    if (randomInt(0, 100) > 50) {
      // move up
      if (randomInt(0, 100) > 50) {
        // move left
        motion.vel.set(-control.dx, 0)
      } else {
        // move right
        motion.vel.set(control.dx, 0)
      }
    } else {
      // move down
      if (randomInt(0, 100) > 50) {
        // move left
        motion.vel.set(0, -control.dy)
      } else {
        // move right
        motion.vel.set(0, control.dy)
      }
    }
  },
})(nEnemyControl)($engine)
