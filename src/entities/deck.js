import { Rectangle } from 'core/pixi'
import { withRectDisplay, pipeHOCs, withComponents } from '../components/hoc'
import * as c from '../components'

export default (_, { $positioning }) => {
  const bounds = new Rectangle(0, 0, 800, 80)
  const pos = $positioning.bottomLeft({ x: 0, y: bounds.height })

  return pipeHOCs(
    withComponents(
      c.HudLayer(),
      c.Deck(),
      c.Position({ x: pos.x, y: pos.y })
    ),
    withRectDisplay(bounds.width, bounds.height, 0xf44336, 'hud')
  )
}
