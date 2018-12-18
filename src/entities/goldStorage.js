import * as c from '../components'
import { withComponents, withIsoDisplay, pipeHOCs } from '../components/hoc'

export default ({ id, x, y, offsetX, offsetY, isoWidth, isoHeight, sizeInCells }, { $config }) => (
  pipeHOCs(
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
        width: $config.cartTileSize,
        height: $config.cartTileSize,
        sizeInCells,
      }),
    ),
    withIsoDisplay(id),
  )
)
