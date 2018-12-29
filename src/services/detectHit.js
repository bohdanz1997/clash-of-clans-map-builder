import { hitTest } from 'core/collision'
import * as c from '../components'

export const detectHit = (clientEntity, sourceEntity) => {
  const pointer = clientEntity.get(c.Pointer)

  const isIso = sourceEntity.has(c.IsoPosition)
  const collision = sourceEntity.get(c.Collision)

  const pointerPos = isIso
    ? pointer.input.cartPosition
    : pointer.input.position

  return hitTest.rect(collision.bounds, pointerPos)
}
