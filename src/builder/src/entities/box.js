import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import { hex } from 'core/pixi'
import * as c from '../components'

export const Box = ({
  data: { x, y, width, height, color },
}) => {
  const sprite = View.rect({
    width,
    height,
    color: hex`#6d40f4`,
  })

  return createEntity(
    c.Layer.UI(),
    c.UI(),
    ({ entity }) => c.FSM(entity),
    c.Draggable(),
    c.Position({ x, y }),
    c.Motion(),
    c.Collision({ width, height }),
    c.Display(sprite)
  )
}
