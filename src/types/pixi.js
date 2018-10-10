export interface Point {
  x: number,
  y: number,

  set(x?: number, y?: number): void,
  copy(point: Point): void,
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
  position: Point,
  addChild(any): any,
}

export interface Application {
  stage: Container,
}
