import { createEntity } from 'core/ecs'
import * as e from '.'
import * as c from '../components'

export const Pointer = ({
  entities,
}) => createEntity(
  c.Position(),
  c.IsoPosition(),
  c.PointerContext(),
  c.Child.Default(entities.create(e.Debug, { x: 10, y: 10 })),
  ({ entity }) => c.FSM(entity),
)
