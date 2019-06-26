import { Graphics } from 'pixi.js'

export class ShapeFactory {
  /**
   * @return {PIXI.Graphics}
   */
  static rect({ width, height, color, alpha = 1 }) {
    const g = new Graphics()
      .beginFill(color)
      .drawRect(0, 0, width, height)
      .endFill()
    g.alpha = alpha
    return g
  }
}
