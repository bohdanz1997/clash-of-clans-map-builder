import { keepInRanges } from 'core/util/index'

export const createSmoothStep = ({ step, maxForce, minRange, maxRange, damping }) => {
  let force = 0

  return {
    applyForce(value) {
      force *= damping
      return keepInRanges(minRange, maxRange, value + force)
    },

    increase() {
      force += step
      force = Math.min(force, maxForce)
    },

    decrease() {
      force -= step
      force = Math.max(force, -maxForce)
    },
  }
}
