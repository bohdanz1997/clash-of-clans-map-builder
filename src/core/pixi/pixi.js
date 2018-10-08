import * as PIXI from 'pixi.js'

// PIXI aliases
const {
  Point,
  Sprite,
  Rectangle,
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
