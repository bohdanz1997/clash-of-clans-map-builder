import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import * as c from '../components'

export const Tile = ({
  data: { x, y, isoWidth, isoHeight },
}) => createEntity(
  c.Layer.Ground(),
  c.Position({ x, y }),
  c.IsoPosition(),
  c.Display(DisplayFactory.sprite('ground', {
    width: isoWidth,
    height: isoHeight,
  })),
)
