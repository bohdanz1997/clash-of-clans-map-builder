import { MatrixHelper } from 'core/math'
import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import { Point, Container, Sprite } from 'core/pixi'
import * as c from '../components'

/**
 * @param def
 * @param asset
 * @param {TileMap} map
 * @param {Config} config
 * @param {EntityManager} entities
 * @param {Application} app
 * @param {EntityDataMapper} entityDataMapper
 */
export const Background = ({
  data: { def, asset },
  map,
  config,
  entities,
  app,
  entityDataMapper,
}) => {
  const definition = entities.getDefinition(def)
  const objects = map.generateObjects(def, definition).map(entityDataMapper.map)

  const sprites = objects.map((object) => {
    const isoPos = MatrixHelper.isoMatrix.apply(new Point(object.x, object.y))

    return DisplayFactory.sprite({
      asset,
      x: isoPos.x,
      y: isoPos.y,
      width: definition.isoWidth,
      height: definition.isoHeight,
    })
  })

  const container = new Container()
  container.addChild(...sprites)
  const texture = app.renderer.generateTexture(container)
  const sprite = new Sprite(texture)

  return createEntity(
    c.GroundLayer(),
    c.Position({
      x: -config.hWidth - map.config.isoTileHeight,
      y: 0,
    }),
    c.Display(sprite),
  )
}
