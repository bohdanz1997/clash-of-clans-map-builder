import * as c from '../components'
import { withComponents, withIsoDisplay, pipeHOCs } from '../components/hoc'

export default ({ x, y, offsetX, offsetY, width, height }) => pipeHOCs(
  withComponents(
    c.GameObject(),
    c.Position({ x, y, offsetX, offsetY }),
  ),
  withIsoDisplay('clanCastle', width, height),
)
