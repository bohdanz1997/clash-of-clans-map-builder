import { AnimatedSprite, Sprite, utils } from 'pixi.js'
import { TextFactory } from './TextFactory'
import { ShapeFactory } from './ShapeFactory'
import { MatrixHelper } from '../math'

const createSprite = (texture, filters = []) => {
  const sprite = new Sprite(texture)
  sprite.filters = filters
  return sprite
}

export class DisplayFactory {
  constructor({ renderer }) {
    this.renderer = renderer
  }

  /**
   * @return {PIXI.AnimatedSprite}
   */
  static animatedSprite({ atlas, speed = 1 }) {
    const textures = Object.values(atlas.textures)
    const sprite = new AnimatedSprite(textures, false)
    sprite.animationSpeed = speed
    sprite.play()

    return sprite
  }

  /**
   * @return {PIXI.Sprite}
   */
  static sprite(asset, { x = 0, y = 0, width = undefined, height = undefined, filters } = {}) {
    const texture = utils.TextureCache[asset]

    const sprite = createSprite(texture, filters)
    sprite.position.set(x, y)
    sprite.width = width || sprite.width
    sprite.height = height || sprite.height

    return sprite
  }

  /**
   * @return {PIXI.Graphics}
   */
  static rect({ width, height, color, filters, alpha = 1 }) {
    const rect = ShapeFactory.rect({ width, height, color })
    rect.filters = filters
    rect.alpha = alpha

    return rect
  }

  /**
   * @return {PIXI.Graphics}
   */
  static isoRect({ width, height, color, filters, alpha = 1 }) {
    const rect = ShapeFactory.rect({ width, height, color })
    rect.pivot.set(-(width / 2), height / 2)
    rect.transform.setFromMatrix(MatrixHelper.isoMatrix)
    rect.filters = filters
    rect.alpha = alpha

    return rect
  }

  static text({ x, y, fontSize, fill, content }) {
    return TextFactory.create({
      x, y, fontSize, fill, content,
    })
  }

  static textSprite({ fontSize, fill, content } = {}) {
    return TextFactory.create({ fontSize, fill, content })
  }
}
