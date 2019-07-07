import { filters } from 'pixi.js'
import { hex } from 'core/pixi'
import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as c from '../components'

export const Overlay = ({
  data: { x, y, size, alpha = 1 },
  map,
}) => {
  const sizePx = size * map.config.cellWidth
  return createEntity(
    c.Layer.BackGround(),
    c.Position({ x, y }),
    c.IsoPosition(),
    c.Display(View.isoRect({
      width: sizePx,
      height: sizePx,
      color: hex`#8bc34a`,
      filters: [new filters.AlphaFilter(alpha)],
    })),
  )
}
