import { Point } from 'pixi.js'
import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as e from '.'
import * as c from '../components'

export const Building = ({
  data: { id, def, x, y, level, offsetX, offsetY, radius },
  map,
  entities,
}) => createEntity(
  c.Layer.Building(),
  c.Building(def),
  c.Draggable(),
  c.Interactive(),
  c.Serializable(entity => ({
    id,
    def,
    level,
    cx: entity.get(c.Position).col,
    cy: entity.get(c.Position).row,
  })),
  c.Child.Overlay(entities.create(e.Overlay, { x, y, radius })),
  c.Child.Debug({
    entity: entities.create(e.Debug),
    offset: new Point(-110, 0),
  }),
  c.Position({ x, y, offsetX, offsetY }),
  c.IsoPosition(),
  c.Motion(), // to update col, row
  c.Collision({
    width: map.config.tileWidth,
    height: map.config.tileHeight,
    radius,
  }),
  c.Display(View.sprite(def)),
  ({ entity }) => c.FSM(entity),
)
