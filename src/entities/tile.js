import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import * as c from '../components'

export default ({
  data: { x, y, isoWidth, isoHeight },
}) => createEntity(
  c.GroundLayer(),
  c.Position({ x, y }),
  c.IsoPosition(),
  c.Display(DisplayFactory.sprite({
    asset: 'ground',
    width: isoWidth,
    height: isoHeight,
  })),
)
