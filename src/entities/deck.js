import { Rectangle } from 'core/pixi'
import { pipeHOCs, withComponents } from '../components/hoc'
import { withDisplay } from '../services'
import * as c from '../components'

export const Deck = ({ positioning }) => {
  const bounds = new Rectangle(0, 0, 800, 80)
  const pos = positioning.bottomLeft({ x: 0, y: bounds.height })

  return pipeHOCs(
    withComponents(
      c.HudLayer(),
      c.Deck(),
      c.Position(pos)
    ),
    withDisplay.rect({
      width: bounds.width,
      height: bounds.height,
      color: 0xf44336,
      parentId: 'hud',
    })
  )
}
