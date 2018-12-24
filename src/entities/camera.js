import { createEntity } from 'core/scent'
import { keys, Keyboard } from 'core/input'
import { createSmoothStep } from 'core/animation'
import { Config } from 'core/boot'
import { TileMapConfig } from 'core/tilemap'

import * as c from '../components'

/**
 * @param {Object} args
 * @param {Keyboard} args.keyboard
 * @param {Config} args.config
 * @param {TileMapConfig} args.mapConfig
 */
export const Camera = ({
  data: { speed, damp },
  keyboard,
  world,
  config,
  mapConfig,
}) => {
  const [
    keyZoomPlus,
    keyZoomMinus,
  ] = keyboard.addKeys(keys.ZERO, keys.NINE)

  return createEntity(
    c.Camera({
      world,
      worldWidth: mapConfig.widthInPixels,
      worldHeight: mapConfig.heightInPixels,
      width: config.width,
      height: config.height,
    }),
    c.Position({
      x: -config.hWidth + mapConfig.hIsoTileWidth,
      y: config.hHeight - mapConfig.hIsoTileHeight,
    }),
    c.Motion({
      dampX: damp,
      dampY: damp,
    }),
    c.MotionControl({
      dx: speed,
      dy: speed,
      ...keyboard.makeWASDKeys(),
    }),
    c.ZoomControl({
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
