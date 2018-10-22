import { createSprite } from '../pixi'
import { spriteMixin } from '../mixins'

export const createIsoSprite = (textureId, x = 0, y = 0, width = 0, height = 0) => {
  const sprite = createSprite(textureId, x, y)
  sprite.cartX = x
  sprite.cartY = y
  sprite.isoX = x
  sprite.isoY = y
  sprite.cartWidth = width
  sprite.cartHeight = height
  sprite.width = width
  sprite.height = height

  spriteMixin(sprite)

  return sprite
}
