import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as c from '../components'

export const Tile = ({
  data: { x, y, isoWidth, isoHeight },
}) => createEntity(
  c.Layer.Ground(),
  c.Position({ x, y }),
  c.IsoPosition(),
  c.Display(View.sprite('ground', {
    width: isoWidth,
    height: isoHeight,
  })),
)
