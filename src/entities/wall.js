import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as c from '../components'

export const Wall = ({
  data: { id, def, x, y, offsetX, offsetY, size, level },
  map,
}) => {
  const sizePx = map.config.cellWidth * size
  return createEntity(
    c.Layer.Building(),
    c.Building(def),
    c.Interactive(),
    c.Draggable(),
    c.Serializable(entity => ({
      id,
      level,
      def: id,
      col: entity.get(c.Position).col,
      row: entity.get(c.Position).row,
    })),
    c.Position({ x, y, offsetX, offsetY }),
    c.IsoPosition(),
    c.Motion(), // to update col, row
    c.Collision({
      width: sizePx,
      height: sizePx,
      size,
    }),
    c.Display(View.sprite(id)),
    ({ entity }) => c.FSM(entity),
  )
}
