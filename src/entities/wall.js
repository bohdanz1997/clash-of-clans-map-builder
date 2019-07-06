import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as c from '../components'

export const Wall = ({
  data: { id, x, y, size, level },
  map,
}) => createEntity(
  c.Layer.Building(),
  c.Building(),
  c.Interactive(),
  c.Draggable(),
  c.Serializable(entity => ({
    id,
    level,
    def: id,
    col: entity.get(c.Position).col,
    row: entity.get(c.Position).row,
  })),
  c.Position({ x, y }),
  c.IsoPosition(),
  c.Motion(), // to update col, row
  c.Collision({ width: map.config.cellWidth, height: map.config.cellHeight, size }),
  c.Display(View.sprite(id))
)
