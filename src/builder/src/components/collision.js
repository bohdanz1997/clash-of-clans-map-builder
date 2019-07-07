import { component } from 'core/ecs'
import { Rectangle } from 'pixi.js'

class CollisionRaw {
  bounds = new Rectangle()
  width = 0
  height = 0
  size = 1

  constructor({ width, height, size = 1 }) {
    this.width = width
    this.height = height
    this.size = size
    this.bounds = new Rectangle(0, 0, width, height)
  }
}

/** @type {CollisionRaw} */
export const Collision = component('collision', CollisionRaw)
