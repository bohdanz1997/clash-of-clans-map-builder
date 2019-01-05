import * as c from '../components'
import { withComponents, pipeHOCs } from '../components/hoc'
import { withDisplay } from '../services'

export default ({
  data: { id, def, x, y, offsetX, offsetY, radius },
  map,
}) => pipeHOCs(
  withComponents(
    c.BuildingLayer(),
    c.Draggable(),
    c.Interactive(),
    c.Idle(),
    c.OverlayOwner(),
    c.Position({ x, y, offsetX, offsetY }),
    c.IsoPosition(),
    c.Motion(),
    c.Collision({
      width: map.config.tileWidth,
      height: map.config.tileHeight,
      radius,
    }),
  ),
  withDisplay.sprite({ asset: def }),
)
