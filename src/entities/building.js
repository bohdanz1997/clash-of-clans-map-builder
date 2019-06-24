import { createEntity, DisplayFactory } from 'core'
import * as c from '../components'
import { Overlay } from './overlay'

export const Building = ({
  data: { id, def, x, y, offsetX, offsetY, radius },
  map,
  entities,
}) => {
  const sizePx = radius * map.config.cellWidth
  const overlay = entities.create(Overlay, {
    x,
    y,
    width: sizePx,
    height: sizePx,
  })

  return createEntity(
    c.BuildingLayer(),
    c.Draggable(),
    c.Interactive(),
    c.Relation.Child(overlay),
    c.Position({ x, y, offsetX, offsetY }),
    c.IsoPosition(),
    c.Motion(),
    c.Collision({
      width: map.config.tileWidth,
      height: map.config.tileHeight,
      radius,
    }),
    c.Display(DisplayFactory.sprite({ asset: def })),
    ({ entity }) => c.FSM({ entity }),
  )
}
