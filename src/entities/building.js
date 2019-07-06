import { Point } from 'pixi.js'
import { createEntity, branch } from 'core/ecs'
import { View } from 'core/display'
import * as e from '.'
import * as c from '../components'

/**
 * @param {Object} data
 * @param {TileMap} map
 * @param {EntityManager} entities
 */
export const Building = ({
  data: { id, def, x, y, level, offsetX, offsetY, size, range },
  map,
  entities,
}) => {
  const sizePx = map.config.cellWidth * size
  return createEntity(
    c.Layer.Building(),
    c.Building(def),
    c.Draggable(),
    c.Interactive(),
    c.Serializable(entity => ({
      id,
      def,
      level,
      col: entity.get(c.Position).col,
      row: entity.get(c.Position).row,
    })),
    branch(Boolean(range), c.Child.Range(entities.create(e.Range, {
      x,
      y,
      radius: range,
      parentSize: size,
    }))),
    c.Child.Overlay(entities.create(e.Overlay, { x, y, size })),
    c.Child.Debug({
      entity: entities.create(e.Debug),
      offset: new Point(-110, 0),
    }),
    c.Position({ x, y, offsetX, offsetY }),
    c.IsoPosition(),
    c.Motion(), // to update col, row
    c.Collision({
      width: sizePx,
      height: sizePx,
      size,
    }),
    c.Display(View.sprite(def)),
    ({ entity }) => c.FSM(entity),
  )
}
