import { component } from 'core/scent'

class MotionControlData {
  constructor({ dx = 0, dy = 0, up, down, left, right }) {
    this.dx = dx
    this.dy = dy
    this.up = up
    this.down = down
    this.left = left
    this.right = right
  }
}

export const MotionControl = component('motionControl', MotionControlData)
