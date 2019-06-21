import { Rectangle } from 'pixi.js'
import { DisplayFactory } from 'core/display'
import { createEntity } from 'core/scent'
import * as c from '../components'

export const InventoryItem = ({
  data: { index, entityMeta },
  align,
}) => {
  const bounds = new Rectangle(0, 0, 80, 80)
  const margin = 20

  const pos = align.bottomLeft({
    x: index * bounds.width + margin,
    y: bounds.height,
  })

  return createEntity(
    c.InventoryItem(),
    c.EntityMeta(entityMeta),
    c.HudLayer(),
    c.Position(pos),
    c.Interactive(),
    c.Collision(bounds),
    c.Display(DisplayFactory.sprite({
      asset: entityMeta.def,
      width: bounds.width,
      height: bounds.height,
    }))
  )
}
