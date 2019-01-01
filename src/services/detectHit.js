import { hitTest } from 'core/collision'
import * as c from '../components'

export const detectHit = (clientEntity, sourceEntity) => {
  const pointerPosition = clientEntity.get(c.Position)
  const pointerIsoPosition = clientEntity.get(c.IsoPosition)

  const isIso = sourceEntity.has(c.IsoPosition)
  const collision = sourceEntity.get(c.Collision)

  const pointerPos = isIso
    ? { x: pointerIsoPosition.cartX, y: pointerIsoPosition.cartY }
    : { x: pointerPosition.x, y: pointerPosition.y }

  return hitTest.rect(collision.bounds, pointerPos)
}
