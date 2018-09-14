import {
  pipeHOCs,
  withDisplay,
  withComponents,
} from '../components/hoc'
import * as c from '../components'

import { blob } from '../assets/atlas/treasureHunter'

export default ({ x, y, width, height, speed, maxTime }) => (
  pipeHOCs(
    withComponents(
      c.Enemy(),
      c.Position({ x, y }),
      c.Motion(),
      c.Collision({ width, height }),
      c.Control({ dx: speed, dy: speed }),
      c.Brain({ maxTime }),
    ),
    withDisplay(blob),
  )
)
