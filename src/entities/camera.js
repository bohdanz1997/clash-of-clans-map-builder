// @flow
import type { Deps } from 'types/game'

import { createEntity } from 'core/scent'
import { keys, makeWASDKeys } from 'core/input'
import { createSmoothStep } from 'core/animation'

import * as c from '../components'

export default ({ speed, damp }: any, scope: Deps) => {
  const keyboard = scope.$keyboard
  const world = scope.$world
  const config = scope.$config

  const [
    keyZoomPlus,
    keyZoomMinus,
  ] = keyboard.addKeys(keys.ZERO, keys.NINE)

  return createEntity(
    c.Camera.of({
      world,
      worldWidth: config.worldWidth,
      worldHeight: config.worldHeight,
      width: config.width,
      height: config.height,
    }),
    c.Position.of({
      x: -config.hWidth + config.hTileWidth,
      y: config.hHeight - config.tileHeight,
    }),
    c.Motion.of({
      dampX: damp,
      dampY: damp,
    }),
    c.MotionControl.of({
      dx: speed,
      dy: speed,
      ...makeWASDKeys(keyboard),
    }),
    c.ZoomControl.of({
      plus: keyZoomPlus,
      minus: keyZoomMinus,
      smoothZoom: createSmoothStep({
        damping: damp,
        step: 0.002,
        maxForce: 0.15,
        minRange: 0.75,
        maxRange: 1.5,
      }),
    })
  )
}
