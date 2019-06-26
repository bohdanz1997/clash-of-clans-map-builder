import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import * as c from '../components'

/**
 * @param {Align} align
 */
export const Inventory = ({ align }) => {
  const height = 80
  const pos = align.bottom(height)

  return createEntity(
    c.Layer.Hud(),
    c.Inventory(),
    c.Position(pos),
    c.Display(DisplayFactory.rect({
      width: align.bounds.width,
      height,
      color: 0xf44336,
      alpha: 0.8,
    }))
  )
}
