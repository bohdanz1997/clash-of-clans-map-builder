import { Rectangle } from 'pixi.js'
import * as c from '../components'
import { withDisplay, pipeHOCs, withComponents } from '../components/hoc'

export default ({ x, y, entityId }, { $positioning }) => {
  const bounds = new Rectangle(0, 0, 80, 80)
  const pos = $positioning.bottomLeft({ x: 0, y: bounds.height })

  return pipeHOCs(
    withComponents(
      c.DeckItem(),
      c.EntityMeta({
        id: 'clanCastle',
      }),
      c.HudLayer(),
      c.Position({ x: pos.x, y: pos.y }),
      c.Interactive(),
      c.Collision({ width: bounds.width, height: bounds.height }),
    ),
    withDisplay(entityId, bounds.width, bounds.height, 'hud')
  )
}
