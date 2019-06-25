import { component } from 'core/scent'
import { Point } from 'pixi.js'

class MotionData {
  constructor({ vx = 0, vy = 0, dampX = 1, dampY = 1 } = {}) {
    this.vel = new Point(vx, vy)
    this.damp = new Point(dampX, dampY)
  }
}

export const Motion = component('motion', MotionData)
