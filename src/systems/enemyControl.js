import { createSystem } from '../core/factories'
import { nEnemyControl } from '../nodes'
import { randomInt } from '../core/util'

export default $engine => createSystem({
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
      if (randomInt(0, 100) > 50) {
        motion.vel.set(-control.dx, 0)
      } else {
        motion.vel.set(control.dx, 0)
      }
    } else if (randomInt(0, 100) > 50) {
      motion.vel.set(0, -control.dy)
    } else {
      motion.vel.set(0, control.dy)
    }
  },
})(nEnemyControl)($engine)
