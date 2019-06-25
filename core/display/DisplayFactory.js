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
   * @return {PIXI.Sprite}
   */
  rect({ width, height, color, filters }) {
    const rect = ShapeFactory.rect({ width, height, color })
    const texture = this.renderer.generateTexture(rect)

    return createSprite(texture, filters)
  }

  /**
   * @return {PIXI.Sprite}
   */
  isoRect({ width, height, color, filters }) {
    const rect = ShapeFactory.rect({ width, height, color })
    const texture = this.renderer.generateTexture(rect)
    const sprite = createSprite(texture, filters)

    sprite.pivot.set(-(width / 2), height / 2)
    sprite.transform.setFromMatrix(MatrixHelper.isoMatrix)

    return sprite
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
