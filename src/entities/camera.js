// @flow
import type { GameConfig } from '../types/game'

import * as c from '../components'
import { createEntity } from '../core/factories'

export default ({ speed, damp }: any, config: GameConfig) => createEntity(
  c.Camera(),
  c.Position({
    x: -config.hWidth + config.hTileWidth,
    y: -100,
  }),
  c.Motion(),
  c.Control({
    dx: speed,
    dy: speed,
    dampX: damp,
    dampY: damp,
  }),
)
