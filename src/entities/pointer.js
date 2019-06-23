import { createEntity } from 'core/scent'
import * as c from '../components'

export const Pointer = () => {
  const entity = createEntity(
    c.Position,
    c.IsoPosition,
    c.PointerContext,
  )
  entity.add(c.FSM(entity))
  return entity
}
