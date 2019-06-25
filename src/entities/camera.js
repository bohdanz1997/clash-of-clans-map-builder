import { createSmoothStep } from 'core/animation'
import { createEntity } from 'core/scent'
import { keys, Keyboard } from 'core/input'
import { Config } from 'core/boot'
import { TileMap } from 'core/tilemap'
import * as c from '../components'

/**
 * @param speed
 * @param damp
 * @param {Keyboard} keyboard
 * @param world
 * @param {Config} config
 * @param {TileMap} map
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
