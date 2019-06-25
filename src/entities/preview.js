import { filters } from 'pixi.js'
import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'
import * as c from '../components'
import { Overlay } from './overlay'

export const Preview = ({
  data: { id, def, x, y, offsetX, offsetY, radius },
  map,
  entities,
}) => {
  const alpha = 0.5
  const overlay = entities.create(Overlay, { x, y, radius, alpha })
  const sprite = DisplayFactory.sprite(def, {
    filters: [new filters.AlphaFilter(alpha)],
  })

  return createEntity(
    c.Layer.Drag(),
    c.Building(),
    c.Relation.Child({ entity: overlay }),
    c.Position({ x, y, offsetX, offsetY }),
    c.IsoPosition(),
    c.Collision({
      width: map.config.tileWidth,
      height: map.config.tileHeight,
      radius,
    }),
    c.Display(sprite),
  )
}