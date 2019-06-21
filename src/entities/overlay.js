import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import * as c from '../components'

export default ({
  data: { width, height, target },
}) => createEntity(
  c.BackGroundLayer(),
  c.Overlay({ target }),
  c.Position(),
  c.IsoPosition(),
  c.Display(DisplayFactory.isoRect({ width, height, color: 0x8bc34a })),
)
