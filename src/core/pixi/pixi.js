import * as PIXI from 'pixi.js'

// PIXI aliases
const {
  Point,
  Sprite,
  Rectangle,
  Container,
  Application,
  loader,
  utils: {
    TextureCache,
  },
} = PIXI

export {
  Point,
  Sprite,
  Rectangle,
  Application,
  Container,
  TextureCache,
  loader,
  PIXI,
}

// helpers
export const getTextureFromCache = textureId => TextureCache[textureId]

export const createSprite = (textureId, x = 0, y = 0) => {
  const texture = getTextureFromCache(textureId)
  const sprite = new Sprite(texture)
  sprite.position.set(x, y)
  return sprite
}

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
  return sprite
}
