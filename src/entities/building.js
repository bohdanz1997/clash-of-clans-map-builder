import { createEntity, displayFactory } from 'core'
import * as c from '../components'

export default ({
  data: { id, def, x, y, offsetX, offsetY, radius },
  map,
}) => createEntity(
  c.BuildingLayer(),
  c.Draggable(),
  c.Interactive(),
  c.OverlayOwner(),
  c.Position({ x, y, offsetX, offsetY }),
  c.IsoPosition(),
  c.Motion(),
  c.Collision({
    width: map.config.tileWidth,
    height: map.config.tileHeight,
    radius,
  }),
  c.Display(displayFactory.sprite({ asset: def }))
)
