import * as c from '../components'
import { withComponents, pipeHOCs } from '../components/hoc'
import { withDisplay } from '../services'

export const Building = ({
  data: { id, def, x, y, offsetX, offsetY, radius },
  mapConfig,
}) => pipeHOCs(
  withComponents(
    c.Identity({ id }),
    c.BuildingLayer(),
    c.Draggable(),
    c.Interactive(),
    c.OverlayOwner(),
    c.Position({ x, y, offsetX, offsetY }),
    c.IsoPosition(),
    c.Motion(),
    c.Collision({
      width: mapConfig.tileWidth,
      height: mapConfig.tileHeight,
      radius,
    }),
  ),
  withDisplay.sprite({ asset: def }),
)
