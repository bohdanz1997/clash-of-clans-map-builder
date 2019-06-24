import { Rectangle } from 'pixi.js'
import { DisplayFactory } from 'core/display'
import { createEntity } from 'core/scent'
import * as c from '../components'

const Counter = ({
  data: { x, y },
}) => createEntity(
  c.InventoryCounter(),
  c.HudLayer(),
  c.Position({ x, y }),
  c.Display(DisplayFactory.text({
    fontSize: 14,
    fill: 'white',
  }))
)

export const InventoryItem = ({
  data: { index, entityMeta },
  align,
  entities,
}) => {
  const bounds = new Rectangle(0, 0, 80, 80)
  const margin = 20

  const pos = align.bottomLeft({
    x: index * bounds.width + margin,
    y: bounds.height,
  })

  const couter = entities.create(Counter, pos)

  return createEntity(
    c.InventoryItem(),
    c.EntityMeta(entityMeta),
    c.HudLayer(),
    c.Relation.Child(couter),
    c.Position(pos),
    c.Interactive(),
    c.Collision(bounds),
    c.Display(DisplayFactory.sprite({
      asset: entityMeta.def,
      width: bounds.width,
      height: bounds.height,
    })),
    ({ entity }) => c.FSM({ entity }),
  )
}
