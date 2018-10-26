// @flow
import type { Deps } from 'types/game'

import { createEntity } from 'core/factories'
import { makeWASDKeys } from 'core/input'

import * as c from '../components'

export default ({ speed, damp }: any, { $config, $keyboard, $world }: Deps) => createEntity(
  c.Camera({
    world: $world,
    worldWidth: $config.worldWidth,
    worldHeight: $config.worldHeight,
    width: $config.width,
    height: $config.height,
  }),
  c.Position({
    x: -$config.hWidth + $config.hTileWidth,
    y: $config.hHeight - $config.tileHeight,
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
