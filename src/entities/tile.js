import * as c from '../components'
import { withComponents, withIsoDisplay, pipeHOCs } from '../components/hoc'

export default ({ x, y, isoWidth, isoHeight }) => pipeHOCs(
  withComponents(
    c.Ground(),
    c.Position({ x, y }),
    c.IsoPosition(),
  ),
  withIsoDisplay('ground', isoWidth, isoHeight),
)
