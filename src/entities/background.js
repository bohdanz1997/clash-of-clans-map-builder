import { MatrixHelper } from 'core/math'
import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import { Point, Container, Sprite } from 'pixi.js'
import * as c from '../components'

/**
 * @param def
 * @param asset
 * @param {TileMap} map
 * @param {Config} config
 * @param {EntityManager} entities
 * @param {Renderer} renderer
 * @param {EntityDataMapper} entityDataMapper
 */
export const Background = ({
  data: { def, asset },
  map,
  config,
  entities,
  renderer,
  entityDataMapper,
}) => {
  const definition = entities.getDefinition(def)
  const objects = map.generateObjects(def, definition).map(entityDataMapper.map)

  const sprites = objects.map((object) => {
    const isoPos = MatrixHelper.isoMatrix.apply(new Point(object.x, object.y))

    return DisplayFactory.sprite(asset, {
      x: isoPos.x,
      y: isoPos.y,
      width: definition.isoWidth,
      height: definition.isoHeight,
    })
  })

  const container = new Container()
  container.addChild(...sprites)
  const texture = renderer.generateTexture(container)
  const sprite = new Sprite(texture)

  return createEntity(
    c.Layer.Ground(),
    c.Position({
      // set x to center screen
      x: -config.hWidth - map.config.hIsoTileHeight,
      y: 0,
    }),
    c.Display(sprite),
  )
}
