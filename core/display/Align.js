import { Point, Rectangle } from 'core/pixi'

export default class Align {
  constructor(x, y, width, height) {
    this.setBounds(x, y, width, height)
  }

  setBounds(x, y, width, height) {
    this.bounds = new Rectangle(x, y, width, height)
  }

  centerX = (x, w) => this.bounds.width / 2 + x - w / 2

  centerY = (y, h) => this.bounds.height / 2 + y - h / 2

  centerTop = (x = 0, h = 0) => new Point(this.centerX(x, 0), 0)

  centerBottom = (x = 0, w = 0, h = 0) => new Point(this.centerX(x, w), this.bounds.bottom - h)

  center = (x = 0, y = 0, w = 0, h = 0) => new Point(this.centerX(x, w), this.centerY(y, h))

  topLeft = (x = 0, y = 0) => new Point(x, y)

  topRight = (x = 0, y = 0) => new Point(this.bounds.right - x, y)

  bottomLeft = (x = 0, y = 0) => new Point(x, this.bounds.bottom - y)

  bottomRight = (x = 0, y = 0) => new Point(this.bounds.right - x, this.bounds.bottom - y)

  putTopLeft(object) {
    this.setObjectXYByCb(object, this.topLeft)
  }

  putTopRight(object) {
    this.setObjectXYByCb(object, this.topRight)
  }

  putBottomLeft(object) {
    this.setObjectXYByCb(object, this.bottomLeft)
  }

  putBottomRight(object) {
    this.setObjectXYByCb(object, this.bottomRight)
  }

  // eslint-disable-next-line class-methods-use-this
  setObjectXYByCb(object, cb) {
    const newPos = cb(object.x, object.y)
    object.x = newPos.x
    object.y = newPos.y
  }
}
