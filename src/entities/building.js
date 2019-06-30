import { Point } from 'pixi.js'
import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as e from '.'
import * as c from '../components'

export const Building = ({
  data: { id, def, x, y, offsetX, offsetY, radius },
  map,
  entities,
}) => createEntity(
  c.Layer.Building(),
  c.Building(),
  c.Draggable(),
  c.Interactive(),
  c.Child.Overlay(entities.create(e.Overlay, { x, y, radius })),
  c.Child.Debug({
    entity: entities.create(e.Debug),
    offset: new Point(-110, 0),
  }),
  c.Position({ x, y, offsetX, offsetY }),
  c.Motion(), // to update col, row
  c.IsoPosition(),
  c.Collision({
    width: map.config.tileWidth,
    height: map.config.tileHeight,
    radius,
  }),
  c.Display(View.sprite(def)),
  ({ entity }) => c.FSM(entity),
)
