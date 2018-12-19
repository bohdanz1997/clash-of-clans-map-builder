import * as PIXI from 'pixi.js'
import 'pixi-layers'

import * as mixins from '../mixins'

export * from 'pixi.js'

// PIXI aliases
const {
  Point,
  Container,
  Rectangle,
  display: {
    Group,
    Layer,
    Stage,
  },
  utils: {
    TextureCache,
  },
} = PIXI

mixins.pointMixin(Point)
mixins.containerMixin(Container)
mixins.rectangleMixin(Rectangle)

export {
  PIXI,

  Group,
  Layer,
  Stage,
}

// helpers
export const getTextureFromCache = asset => TextureCache[asset]
