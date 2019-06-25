import { AnimatedSprite, getTextureFromCache, Sprite } from '../pixi'
import { textFactory } from './text'
import { rectangleFactory } from './rectangle'
import { MatrixHelper } from '../math'

export class DisplayFactory {
  constructor({ renderer }) {
    this.renderer = renderer
  }

  static animatedSprite({ atlas, speed = 1 }) {
    const textures = Object.values(atlas.textures)
    const sprite = new AnimatedSprite(textures, false)
    sprite.animationSpeed = speed
    sprite.play()

    return sprite
  }

  static sprite(asset, { x = 0, y = 0, width = undefined, height = undefined } = {}) {
    const texture = getTextureFromCache(asset)

    const sprite = new Sprite(texture)
    sprite.position.set(x, y)
    sprite.width = width || sprite.width
    sprite.height = height || sprite.height

    return sprite
  }

  rect({ width, height, color }) {
    const rect = rectangleFactory.create({ width, height, color })
    const texture = this.renderer.generateTexture(rect)

    return new Sprite(texture)
  }

  isoRect({ width, height, color }) {
    const rect = rectangleFactory.create({ width, height, color })
    const texture = this.renderer.generateTexture(rect)
    const sprite = new Sprite(texture)

    sprite.pivot.set(-(width / 2), height / 2)
    sprite.transform.setFromMatrix(MatrixHelper.isoMatrix)

    return sprite
  }

  static text({ x, y, fontSize, fill, content }) {
    return textFactory.create({
      x, y, fontSize, fill, content,
    })
  }

  static textSprite({ fontSize, fill, content } = {}) {
    return textFactory.create({ fontSize, fill, content })
  }
}
