import { component } from 'core/ecs'
import { Rectangle } from 'pixi.js'

class CollisionRaw {
  bounds = new Rectangle()
  width = 0
  height = 0
  radius = 1

  constructor({ width, height, radius = 1 }) {
    this.width = width
    this.height = height
    this.radius = radius
    this.bounds = new Rectangle(0, 0, width, height)
  }
}

/** @type {CollisionRaw} */
export const Collision = component('collision', CollisionRaw)
