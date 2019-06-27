import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as c from '../components'

export const Wall = ({
  data: { id, x, y, radius },
  map,
}) => createEntity(
  c.Layer.Building(),
  c.Building(),
  c.Interactive(),
  c.Draggable(),
  c.Position({ x, y }),
  c.IsoPosition(),
  c.Collision({ width: map.config.cellWidth, height: map.config.cellHeight, radius }),
  c.Display(View.sprite(id))
)
