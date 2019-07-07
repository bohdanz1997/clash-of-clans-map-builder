import { createSmoothStep } from 'core/animation'
import { createEntity } from 'core/ecs'
import { keys, Keyboard } from 'core/input'
import { Config } from 'core/boot'
import { TileMap } from 'core/tilemap'
import * as e from '.'
import * as c from '../components'

/**
 * @param speed
 * @param damp
 * @param {Keyboard} keyboard
 * @param world
 * @param {Config} config
 * @param {TileMap} map
 * @param {EntityManager} entities
 */
export const Camera = ({
  data: { speed, damp },
  keyboard,
  world,
  config,
  map,
  entities,
}) => {
  const [plusZoom, minusZoom] = keyboard.addKeys(keys.ZERO, keys.NINE)
  return createEntity(
    c.Camera({
      world,
      worldWidth: map.config.widthInPixels,
      worldHeight: map.config.heightInPixels,
      width: config.width,
      height: config.height,
    }),
    c.Child.Default(entities.create(e.Debug, { x: 150, y: 10 })),
    c.Position({
      x: -config.hWidth + map.config.hIsoTileWidth,
      y: 0,
    }),
    c.Motion({
      dampX: damp,
      dampY: damp,
      maxVel: 30,
    }),
    c.MotionControl({
      dx: speed,
      dy: speed,
      ...keyboard.makeWASDKeys(),
    }),
    c.ZoomControl({
      plus: plusZoom,
      minus: minusZoom,
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
