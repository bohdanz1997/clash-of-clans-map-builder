import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import * as c from '../components'

export const Overlay = ({
  data: { x, y, width, height },
}) => createEntity(
  c.BackGroundLayer(),
  c.Position({ x, y }),
  c.IsoPosition(),
  c.Display(DisplayFactory.isoRect({ width, height, color: 0x8bc34a })),
)
