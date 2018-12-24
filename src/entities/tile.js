import * as c from '../components'
import { withComponents, pipeHOCs } from '../components/hoc'
import { withDisplay } from '../services'

export const Tile = ({
  data: { x, y, isoWidth, isoHeight },
}) => pipeHOCs(
  withComponents(
    c.GroundLayer(),
    c.Position({ x, y }),
    c.IsoPosition(),
  ),
  withDisplay.sprite({
    asset: 'ground',
    width: isoWidth,
    height: isoHeight,
  }),
)
