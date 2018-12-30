import * as PIXI from 'pixi.js'

import 'pixi-layers'
import './mixins/point'
import './mixins/rectangle'

const {
  display: {
    Group,
    Layer,
    Stage,
  },
  utils: {
    TextureCache,
    EventEmitter,
  },
  loaders: {
    Loader,
    Resource,
  },
  extras: {
    AnimatedSprite,
  },
  Application,
  Rectangle,
  Point,
  Matrix,
  Container,
  Sprite,
  Text,
  Graphics,
} = PIXI

export {
  EventEmitter,
  Group,
  Layer,
  Stage,
  Loader,
  Resource,
  AnimatedSprite,
  Application,
  Rectangle,
  Point,
  Matrix,
  Container,
  Sprite,
  Text,
  Graphics,
}

// helpers
export const getTextureFromCache = asset => TextureCache[asset]
