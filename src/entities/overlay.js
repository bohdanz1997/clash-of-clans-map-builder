import { createEntity } from 'core/scent'
import * as c from '../components'

export const Overlay = ({
  data: { x, y, width, height },
  displayFactory,
}) => createEntity(
  c.Layer.BackGround(),
  c.Position({ x, y }),
  c.IsoPosition(),
  c.Display(displayFactory.isoRect({ width, height, color: 0x8bc34a })),
)
