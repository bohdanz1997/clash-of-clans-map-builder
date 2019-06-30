import * as PIXI from 'pixi.js'

import 'pixi-layers'
import './mixins/point'
import './mixins/rectangle'

const {
  display: {
    /** @type {PIXI.display.Group} */
    Group,
    /** @type {PIXI.display.Layer} */
    Layer,
    /** @type {PIXI.display.Stage} */
    Stage,
  },
  utils: {
    string2hex,
  },
  filters: {
    /** @type {PIXI.filters.BlurFilter} */
    BlurFilter,
    /** @type {PIXI.filters.AlphaFilter} */
    AlphaFilter,
    /** @type {PIXI.filters.ColorMatrixFilter} */
    ColorMatrixFilter,
  },
} = PIXI

export const hex = string => string2hex(string[0])

export {
  Group,
  Layer,
  Stage,
  string2hex,
  BlurFilter,
  AlphaFilter,
  ColorMatrixFilter,
}
