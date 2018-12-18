import { Rectangle } from 'pixi.js'
import { pipeHOCs, withComponents } from '../components/hoc'
import { withDisplay } from '../services'
import * as c from '../components'

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
      c.Position(pos),
      c.Interactive(),
      c.Collision(bounds),
    ),
    withDisplay.sprite({
      texture: entityId,
      width: bounds.width,
      height: bounds.height,
      parentId: 'hud',
    }),
  )
}
