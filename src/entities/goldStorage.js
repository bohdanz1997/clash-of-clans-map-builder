import * as c from '../components'
import { withComponents, withIsoDisplay, pipeHOCs } from '../components/hoc'

export default ({ x, y, offsetX, offsetY, isoWidth, isoHeight }, { $config }) => (
  pipeHOCs(
    withComponents(
      c.GameObject(),
      c.Building(),
      c.Draggable(),
      c.BackGround(),
      c.Position({ x, y, offsetX, offsetY }),
      c.IsoPosition(),
      c.Collision({
        width: $config.cartTileSize,
        height: $config.cartTileSize,
      }),
    ),
    withIsoDisplay('goldStorage'),
  )
)
