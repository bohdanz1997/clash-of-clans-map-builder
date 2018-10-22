import * as PIXI from 'pixi.js'
import 'pixi-layers'

import * as mixins from '../mixins'

// PIXI aliases
const {
  Point,
  Sprite,
  Rectangle,
  Container,
  Application,
  Graphics,
  loader,
  Matrix,
  utils: {
    TextureCache,
  },
  display: {
    Group,
    Layer,
    Stage,
  },
} = PIXI

mixins.pointMixin(Point)
mixins.containerMixin(Container)
mixins.rectangleMixin(Rectangle)

export {
  Point,
  Sprite,
  Rectangle,
  Application,
  Container,
  TextureCache,
  Graphics,
  Matrix,
  loader,
  PIXI,

  Group,
  Layer,
  Stage,
}

// helpers
export const getTextureFromCache = textureId => TextureCache[textureId]

export const createSprite = (textureId, x = 0, y = 0) => {
  const texture = getTextureFromCache(textureId)
  const sprite = new Sprite(texture)
  sprite.position.set(x, y)
  return sprite
}
