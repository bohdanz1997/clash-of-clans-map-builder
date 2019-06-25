import { Graphics } from 'pixi.js'

export class ShapeFactory {
  /**
   * @return {PIXI.Graphics}
   */
  static rect({ width, height, color }) {
    return new Graphics()
      .beginFill(color)
      .drawRect(0, 0, width, height)
  }
}
