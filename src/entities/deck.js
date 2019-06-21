import { Rectangle } from 'core/pixi'
import { DisplayFactory } from 'core/display'
import { createEntity } from 'core/scent'
import * as c from '../components'

export default ({ align }) => {
  const bounds = new Rectangle(0, 0, 800, 80)
  const pos = align.bottomLeft({ x: 0, y: bounds.height })

  return createEntity(
    c.HudLayer(),
    c.Deck(),
    c.Position(pos),
    c.Display(DisplayFactory.rect({
      width: bounds.width,
      height: bounds.height,
      color: 0xf44336,
    }))
  )
}
