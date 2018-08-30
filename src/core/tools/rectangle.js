import Point from './point'

class Rectangle {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  get center() {
    return new Point(
      this.x + this.width / 2,
      this.y + this.height / 2,
    )
  }
}

export default Rectangle
