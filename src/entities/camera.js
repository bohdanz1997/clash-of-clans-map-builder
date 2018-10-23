// @flow
import type { Deps } from 'types/game'

import { createEntity } from 'core/factories'
import { makeWASDKeys } from 'core/input'

import * as c from '../components'

export default ({ speed, damp }: any, { $config, $keyboard, $app }: Deps) => createEntity(
  c.Camera({
    world: $app.stage.childByName('gameScene'),
    worldWidth: $config.worldWidth,
    worldHeight: $config.worldHeight,
    canvasWidth: $config.width,
    canvasHeight: $config.height,
  }),
  c.Position({
    x: -$config.hWidth + $config.hTileWidth,
    y: -100,
  }),
  c.Motion({
    dampX: damp,
    dampY: damp,
  }),
  c.Control({
    dx: speed,
    dy: speed,
    ...makeWASDKeys($keyboard),
  }),
)
