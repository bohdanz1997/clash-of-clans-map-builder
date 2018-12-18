import * as c from '../components'
import { withComponents, withIsoRectDisplay, pipeHOCs } from '../components/hoc'

export default ({ width, height, target }) => pipeHOCs(
  withComponents(
    c.BackGroundLayer(),
    c.Overlay({ target }),
    c.Position(),
    c.IsoPosition(),
  ),
  withIsoRectDisplay(width, height, 0x8bc34a),
)
