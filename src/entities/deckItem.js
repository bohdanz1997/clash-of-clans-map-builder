import { Rectangle } from 'pixi.js'
import { pipeHOCs, withComponents } from '../components/hoc'
import { withDisplay } from '../services'
import * as c from '../components'

export default ({ index, entityMeta }, { $positioning }) => {
  const bounds = new Rectangle(0, 0, 80, 80)
  const margin = 20

  const pos = $positioning.bottomLeft({
    x: index * bounds.width + margin,
    y: bounds.height,
  })

  return pipeHOCs(
    withComponents(
      c.DeckItem(),
      c.EntityMeta({
        id: entityMeta.id,
        def: entityMeta.def,
        level: entityMeta.level,
        count: entityMeta.count,
      }),
      c.HudLayer(),
      c.Position(pos),
      c.Interactive(),
      c.Collision(bounds),
    ),
    withDisplay.sprite({
      texture: entityMeta.def,
      width: bounds.width,
      height: bounds.height,
      parentId: 'hud',
    }),
  )
}
