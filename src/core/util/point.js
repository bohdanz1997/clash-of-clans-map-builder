export default class Point {
  constructor(x, y) {
    this.x = x
    this.y = y || x
  }

  static zero() {
    return new Point(0)
  }

  static of(val) {
    if (val instanceof Point) {
      return val
    }
    return new Point(val)
  }

  clone() {
    return new Point(this.x, this.y)
  }

  add(pointOrNum) {
    const point = Point.of(pointOrNum)
    return new Point(
      this.x + point.x,
      this.y + point.y,
    )
  }

  sub(pointOrNum) {
    const point = Point.of(pointOrNum)
    return new Point(
      this.x - point.x,
      this.y - point.y,
    )
  }

  mult(pointOrNum) {
    const point = Point.of(pointOrNum)
    return new Point(
      this.x * point.x,
      this.y * point.y,
    )
  }

  divide(pointOrNum) {
    const point = Point.of(pointOrNum)
    return new Point(
      this.x / point.x,
      this.y / point.y,
    )
  }

  toString() {
    return `{ x: ${this.x}, y: ${this.y} }`
  }
}
