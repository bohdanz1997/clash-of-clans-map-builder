import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import { hex } from 'core/pixi'
import * as c from '../components'

/**
 * @param {Align} align
 */
export const Inventory = ({ align }) => {
  const height = 80
  const pos = align.bottom(height)
  const sprite = View.rect({
    width: align.bounds.width,
    height,
    color: hex`#f44336`,
    alpha: 0.8,
  })

  return createEntity(
    c.Layer.Hud(),
    c.Inventory(),
    ({ entity }) => c.FSM(entity),
    c.Position(pos),
    c.Collision({
      width: align.bounds.width,
      height,
    }),
    c.Display(sprite)
  )
}
