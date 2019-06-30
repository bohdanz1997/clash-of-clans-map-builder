import { AnimatedSprite, Sprite, Text, TextStyle, utils } from 'pixi.js'
import { ShapeFactory } from './ShapeFactory'
import { MatrixHelper } from '../math'

const createSprite = (texture, filters = []) => {
  const sprite = new Sprite(texture)
  sprite.filters = filters
  return sprite
}

export class View {
  constructor({ renderer }) {
    /** @type {PIXI.Renderer} */
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
  rect({ width, height, color, filters, alpha = 1 }) {
    const rect = ShapeFactory.rect({ width, height, color })
    const sprite = new Sprite(this.renderer.generateTexture(rect))
    sprite.filters = filters
    sprite.alpha = alpha

    return sprite
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

  /**
   * @param {PIXI.TextStyle} style
   * @param x
   * @param y
   * @return {PIXI.Text}
   */
  static text(style, { x = 0, y = 0 } = {}) {
    const texttStyle = new TextStyle({
      fill: 'white',
      fontSize: 12,
      fontFamily: 'sans',
      ...style,
    })
    const text = new Text('', texttStyle)
    text.roundPixels = true
    text.x = x
    text.y = y
    return text
  }
}
