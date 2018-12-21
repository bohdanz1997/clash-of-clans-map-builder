import * as c from '../components'
import { withComponents, pipeHOCs } from '../components/hoc'
import { withDisplay } from '../services'

export default ({
  id, def, x, y, offsetX, offsetY, isoWidth, isoHeight, radius,
}, { $config }) => pipeHOCs(
  withComponents(
    c.Identity.of({ id }),
    c.BuildingLayer.of(),
    c.Draggable.of(),
    c.Interactive.of(),
    c.OverlayOwner.of(),
    c.Position.of({ x, y, offsetX, offsetY }),
    c.IsoPosition.of(),
    c.Motion.of(),
    c.Collision.of({
      width: $config.cartTileSize,
      height: $config.cartTileSize,
      radius,
    }),
  ),
  withDisplay.sprite({ asset: def }),
)
