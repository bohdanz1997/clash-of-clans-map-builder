import { Rectangle } from 'core/pixi'
import { createEntity } from 'core/scent'
import * as c from '../components'

export const Inventory = ({ align, displayFactory }) => {
  const bounds = new Rectangle(0, 0, 800, 80)
  const pos = align.bottomLeft({ x: 0, y: bounds.height })

  return createEntity(
    c.Layer.Hud(),
    c.Inventory(),
    c.Position(pos),
    c.Display(displayFactory.rect({
      width: bounds.width,
      height: bounds.height,
      color: 0xf44336,
    }))
  )
}
