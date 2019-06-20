import * as c from '../components'
import { withDisplay } from '../services'
import { createEntity } from '../../core/scent'

export default ({
  data: { id, def, x, y, offsetX, offsetY, radius },
  map,
}) => {
  const entity = createEntity(
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
  )

  return withDisplay.sprite({ asset: def })(entity)
}
