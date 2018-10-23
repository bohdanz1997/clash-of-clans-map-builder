export interface Point {
  x: number,
  y: number,

  set(x?: number, y?: number): void,
  copy(point: Point): void,
  clone(): Point,
  equals(p: Point): boolean,
  add(point: Point): Point,
  addNum(num: number): Point,
  sub(point: Point): Point,
  subNum(num: number): Point,
  mult(point: Point): Point,
  multNum(num: number): Point,
  div(point: Point): Point,
  divNum(num: number): Point,
  floor(): Point,
}

export interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number,
  left: number,
  right: number,
  top: number,
  bottom: number,

  clone(): Rectangle,
  copy(rectangle: Rectangle): Rectangle,
  contains(x: number, y: number): boolean,
}

export interface Sprite {
  texture: {},
  width: number,
  height: number,
  position: Point,
}

export interface Container {
  x: number,
  y: number,
  name: string,
  position: Point,
  children: Container[],

  addChild(any): any,
  childByName(string): Container,
}

export interface Application {
  stage: Container,
}

type MatrixParams6 = [number, number, number, number, number, number]

export interface Matrix {
  IDENTITY: Matrix,
  TEMP_MATRIX: Matrix,

  fromArray([]): void,
  set(...MatrixParams6): Matrix,
  toArray(transpose: boolean, out?: []): [],
  apply(pos: Point, newPos?: Point): Point,
  applyInverse(pos: Point, newPos?: Point): Point,
  translate(x: number, y: number): Matrix,
  scale(x: number, y: number): Matrix,
  rotate(angle: number): Matrix,
  append(matrix: Matrix): Matrix,
  setTransform(x: number, y: number, pivotX: number, pivotY: number, scaleX: number, scaleY: number, rotation: number, skewX: number, skewY: number): Matrix,
  prepend(matrix: Matrix): Matrix,
  decompose(transform: any): any,
  invert(): Matrix,
  identity(): Matrix,
  clone(): Matrix,
  copy(matrix: Matrix): Matrix,
}
