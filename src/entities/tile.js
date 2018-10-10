import * as c from '../components'
import { withComponents, withIsoDisplay, pipeHOCs } from '../components/hoc'

export default ({ x, y, width, height }) => pipeHOCs(
  withComponents(
    c.Ground(),
    c.Position({ x, y }),
  ),
  withIsoDisplay('ground', width, height),
)
