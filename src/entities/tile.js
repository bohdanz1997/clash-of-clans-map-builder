import * as c from '../components'
import { withComponents, pipeHOCs } from '../components/hoc'
import { withDisplay } from '../services'

export default ({ x, y, isoWidth, isoHeight }) => pipeHOCs(
  withComponents(
    c.GroundLayer.of(),
    c.Position.of({ x, y }),
    c.IsoPosition.of(),
  ),
  withDisplay.sprite({
    asset: 'ground',
    width: isoWidth,
    height: isoHeight,
  }),
)
