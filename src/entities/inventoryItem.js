import { Rectangle } from 'pixi.js'
import { DisplayFactory } from 'core/display'
import { createEntity } from 'core/scent'
import * as c from '../components'

const Counter = ({
  data: { x, y },
}) => createEntity(
  c.InventoryCounter(),
  c.Layer.Hud(),
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
    c.Layer.Hud(),
    c.Relation.Child({ entity: couter }),
    c.Interactive(),
    c.Selectable(),
    c.Position(pos),
    c.Collision(bounds),
    c.Display(DisplayFactory.sprite(entityMeta.def, {
      width: bounds.width,
      height: bounds.height,
    })),
    ({ entity }) => c.FSM({ entity }),
  )
}
