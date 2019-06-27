import { component } from 'core/ecs'
import { Point } from 'pixi.js'

class MotionData {
  constructor({ vx = 0, vy = 0, dampX = 1, dampY = 1, maxVel = Infinity } = {}) {
    this.vel = new Point(vx, vy)
    this.damp = new Point(dampX, dampY)
    this.maxVel = maxVel
  }
}

export const Motion = component('motion', MotionData)
