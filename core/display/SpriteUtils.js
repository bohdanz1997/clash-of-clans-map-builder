import { Container } from 'pixi.js'

export class SpriteUtils {
  /**
   * @param {string|null} name
   * @param {PIXI.Sprite[]} sprites
   * @return {PIXI.Container}
   */
  static group(name, sprites = []) {
    const container = new Container()
    const spritesList = Array.isArray(sprites)
      ? sprites : [sprites]

    if (spritesList.length > 0) {
      container.addChild(...spritesList)
    }

    container.name = name
    return container
  }
}
