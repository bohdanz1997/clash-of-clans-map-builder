import { getTextureFromCache, Sprite } from 'core/pixi'
import { rectangleFactory } from '../shape'
import { isoMatrix } from '../math'

export const spriteFactory = {
  create({ asset, x = 0, y = 0, width = undefined, height = undefined }) {
    const texture = getTextureFromCache(asset)

    const sprite = new Sprite(texture)
    sprite.position.set(x, y)
    sprite.width = width || sprite.width
    sprite.height = height || sprite.height

    return sprite
  },

  fromRect({ width, height, fillStyle }) {
    const rect = rectangleFactory.create(width, height, fillStyle)
    const texture = rect.generateCanvasTexture()

    return new Sprite(texture)
  },

  isoFromRect({ width, height, fillStyle }) {
    const rect = rectangleFactory.create(width, height, fillStyle)
    const texture = rect.generateCanvasTexture()
    const sprite = new Sprite(texture)

    sprite.pivot.set(-(width / 2), height / 2)
    sprite.transform.setFromMatrix(isoMatrix)

    return sprite
  },
}
