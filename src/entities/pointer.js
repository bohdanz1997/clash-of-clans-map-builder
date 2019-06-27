import { createEntity } from 'core/ecs'
import * as c from '../components'

export const Pointer = () => createEntity(
  c.Position(),
  c.IsoPosition(),
  c.PointerContext(),
  ({ entity }) => c.FSM({ entity }),
)
