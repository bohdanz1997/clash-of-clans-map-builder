import { defComponent } from 'core/scent'

class PointerContextData {
  processor = null
  isDown = false
  isUp = true
  prevDown = false
  prevUp = false
  tapped = false
  visible = true
  downTime = 0
  elapsedTime = 0
}

export const PointerContext = defComponent('context', PointerContextData)

Object.defineProperties(PointerContext.prototype, {
  justDown: {
    get() {
      return !this.prevDown && this.isDown
    },
  },
  justUp: {
    get() {
      return !this.prevUp && this.isUp
    },
  },
})
