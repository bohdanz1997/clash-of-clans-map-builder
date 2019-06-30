import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as c from '../components'

/**
 * @param {Align} align
 * @param {View} view
 */
export const Inventory = ({ align, view }) => {
  const height = 80
  const pos = align.bottom(height)

  return createEntity(
    c.Layer.Hud(),
    c.Inventory(),
    ({ entity }) => c.FSM(entity),
    c.Position(pos),
    c.Collision({
      width: align.bounds.width,
      height,
    }),
    c.Display(view.rect({
      width: align.bounds.width,
      height,
      color: 0xf44336,
      alpha: 0.8,
    }))
  )
}
