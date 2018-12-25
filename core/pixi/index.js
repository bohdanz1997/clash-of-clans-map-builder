import 'pixi-layers'
import './mixins/point'
import './mixins/rectangle'

import * as PIXI from 'pixi.js'

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
} = PIXI

export * from 'pixi.js'

export {
  EventEmitter,
  Group,
  Layer,
  Stage,
  Loader,
  Resource,
}

// helpers
export const getTextureFromCache = asset => TextureCache[asset]
