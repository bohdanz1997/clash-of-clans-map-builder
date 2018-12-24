import * as c from '../components'
import { withComponents, pipeHOCs } from '../components/hoc'
import { withDisplay } from '../services'

export const Overlay = ({
  data: { width, height, target },
}) => pipeHOCs(
  withComponents(
    c.BackGroundLayer(),
    c.Overlay({ target }),
    c.Position(),
    c.IsoPosition(),
  ),
  withDisplay.isoRect({ width, height, color: 0x8bc34a }),
)
