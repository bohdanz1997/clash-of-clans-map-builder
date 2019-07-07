import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as c from '../components'

export const Range = ({
  data: { x, y, radius, parentSize },
  map,
}) => {
  const cellSize = map.config.cellSize
  return createEntity(
    c.Range(),
    c.Layer.BackGround(),
    c.Position({ x, y }),
    c.IsoPosition(),
    c.Display(View.isoCircle({
      radius,
      parentSize,
      cellSize,
    })),
  )
}
