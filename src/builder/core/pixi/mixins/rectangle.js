import { Point, Rectangle } from 'pixi.js'

Rectangle.prototype.setPosition = function setPosition(point) {
  this.x = point.x
  this.y = point.y
  return this
}

Rectangle.prototype.setSize = function setPosition(point) {
  this.width = point.x
  this.height = point.y
  return this
}

Object.defineProperties(Rectangle.prototype, {
  position: {
    get() {
      return new Point(this.x, this.y)
    },
  },
  size: {
    get() {
      return new Point(this.width, this.height)
    },
  },
})
