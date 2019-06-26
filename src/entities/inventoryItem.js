import { DisplayFactory } from 'core/display'
import { createEntity } from 'core/scent'
import * as c from '../components'

const Counter = ({
  data: { x, y },
}) => createEntity(
  c.InventoryCounter(),
  c.Layer.Hud(),
  c.Position({ x, y }),
  c.Display(
    DisplayFactory.text({
      fontSize: 14,
      dropShadow: true,
      dropShadowDistance: 1,
    })
  )
)

export const InventoryItem = ({
  data: { index, entityMeta },
  align,
  entities,
}) => {
  const margin = 20
  const size = 80
  const pos = align.bottomLeft(index * size + margin, size)
  const couter = entities.create(Counter, pos)

  return createEntity(
    c.InventoryItem(),
    c.EntityMeta(entityMeta),
    c.Layer.Hud(),
    c.Child.Default(couter),
    c.Interactive(),
    c.Selectable(),
    c.Position(pos),
    c.Collision({
      width: size,
      height: size,
    }),
    c.Display(DisplayFactory.sprite(entityMeta.def, {
      width: size,
      height: size,
    })),
    ({ entity }) => c.FSM({ entity }),
  )
}
