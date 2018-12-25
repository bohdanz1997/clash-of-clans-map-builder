import { Point } from '..'

Point.prototype.add = function add(point) {
  this.x += point.x
  this.y += point.y
  return this
}

Point.prototype.addNum = function addNum(num) {
  this.x += num
  this.y += num
  return this
}

Point.add = (point1, point2) => new Point(
  point1.x + point2.x,
  point1.y + point2.y,
)

Point.addNum = (point, num) => new Point(
  point.x + num,
  point.y + num,
)

Point.prototype.sub = function sub(point) {
  this.x -= point.x
  this.y -= point.y
  return this
}

Point.prototype.subNum = function subNum(num) {
  this.x -= num
  this.y -= num
  return this
}

Point.sub = (point1, point2) => new Point(
  point1.x - point2.x,
  point1.y - point2.y,
)

Point.subNum = (point, num) => new Point(
  point.x - num,
  point.y - num,
)

Point.prototype.mult = function mult(point) {
  this.x *= point.x
  this.y *= point.y
  return this
}

Point.prototype.multNum = function multNum(num) {
  this.x *= num
  this.y *= num
  return this
}

Point.mult = (point1, point2) => new Point(
  point1.x * point2.x,
  point1.y * point2.y,
)

Point.multNum = (point, num) => new Point(
  point.x * num,
  point.y * num,
)

Point.prototype.div = function div(point) {
  this.x /= point.x
  this.y /= point.y
  return this
}

Point.prototype.divNum = function divNum(num) {
  this.x /= num
  this.y /= num
  return this
}

Point.div = (point1, point2) => new Point(
  point1.x / point2.x,
  point1.y / point2.y,
)

Point.divNum = (point, num) => new Point(
  point.x / num,
  point.y / num,
)

Point.prototype.floor = function floor() {
  this.x = Math.floor(this.x)
  this.y = Math.floor(this.y)
  return this
}

Point.prototype.floorNum = function floorNum(num) {
  return this
    .divNum(num)
    .floor()
    .multNum(num)
}

Point.floor = function floor(point) {
  return new Point(
    Math.floor(point.x),
    Math.floor(point.y)
  )
}

Point.of = (x, y) => new Point(x, y)

Object.defineProperty(Point, 'EMPTY', {
  get() {
    return new Point(0, 0)
  },
  enumerable: true,
  configurable: true,
})
