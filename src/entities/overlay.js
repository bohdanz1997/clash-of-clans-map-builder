import { filters } from 'pixi.js'
import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as c from '../components'

export const Overlay = ({
  data: { x, y, radius, alpha = 1 },
  displayFactory,
  map,
}) => {
  const size = radius * map.config.cellWidth
  return createEntity(
    c.Layer.BackGround(),
    c.Position({ x, y }),
    c.IsoPosition(),
    c.Display(View.isoRect({
      width: size,
      height: size,
      color: 0x8bc34a,
      filters: [new filters.AlphaFilter(alpha)],
    })),
  )
}
