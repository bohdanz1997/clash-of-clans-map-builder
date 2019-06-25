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
} = PIXI

export {
  Group,
  Layer,
  Stage,
}
