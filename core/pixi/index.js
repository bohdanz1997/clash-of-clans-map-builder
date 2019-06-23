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
  Application,
  Rectangle,
  Point,
  Matrix,
  Container,
  Sprite,
  Text,
  Graphics,
  Loader,
  AnimatedSprite,
  Renderer,
  Ticker,
} = PIXI

export {
  EventEmitter,
  Group,
  Layer,
  Stage,
  Loader,
  AnimatedSprite,
  Application,
  Rectangle,
  Point,
  Matrix,
  Container,
  Sprite,
  Text,
  Graphics,
  Renderer,
  Ticker,
}

// helpers
export const getTextureFromCache = asset => TextureCache[asset]
