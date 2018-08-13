class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static empty() {
    return new Point(0, 0)
  }

  static clone(point) {
    return new Point(point.x, point.y)
  }

  add(point) {
    this.x += point.x
    this.y += point.y
  }

  sub(point) {
    this.x -= point.x
    this.y -= point.y
  }
}

export default Point
