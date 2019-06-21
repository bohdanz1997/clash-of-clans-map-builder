import {
  createEntity,
  createSmoothStep,
  keys,
  Keyboard,
  Config,
  TileMap,
} from 'core'

import * as c from '../components'

/**
 * @param {Object} args
 * @param {Keyboard} args.keyboard
 * @param {Config} args.config
 * @param {TileMap} args.map
 */
export const Camera = ({
  data: { speed, damp },
  keyboard,
  world,
  config,
  map,
}) => {
  const [
    keyZoomPlus,
    keyZoomMinus,
  ] = keyboard.addKeys(keys.ZERO, keys.NINE)

  return createEntity(
    c.Camera({
      world,
      worldWidth: map.config.widthInPixels,
      worldHeight: map.config.heightInPixels,
      width: config.width,
      height: config.height,
    }),
    c.Position({
      x: -config.hWidth + map.config.hIsoTileWidth,
      y: 0,
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
