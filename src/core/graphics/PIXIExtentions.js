export const extendPoint = (Point) => {
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
}

export const extendContainer = (Container) => {
  Container.prototype.childByName = function childByName(name) {
    return this.children.find(c => c.name === name)
  }
}
