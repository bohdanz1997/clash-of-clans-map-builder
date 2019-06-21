import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import * as c from '../components'

export default ({
  data: { id, x, y, radius },
  map,
}) => createEntity(
  c.BuildingLayer(),
  c.Interactive(),
  c.Draggable(),
  c.Position({ x, y }),
  c.IsoPosition(),
  c.Collision({ width: map.config.cellWidth, height: map.config.cellHeight, radius }),
  c.Display(DisplayFactory.sprite({ asset: id }))
)
