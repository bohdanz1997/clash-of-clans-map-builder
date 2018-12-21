import * as c from '../components'
import { withComponents, pipeHOCs } from '../components/hoc'
import { withDisplay } from '../services'

export default ({ width, height, target }) => pipeHOCs(
  withComponents(
    c.BackGroundLayer.of(),
    c.Overlay.of({ target }),
    c.Position.of(),
    c.IsoPosition.of(),
  ),
  withDisplay.isoRect({ width, height, color: 0x8bc34a }),
)
