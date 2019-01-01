import { createEntity } from 'core/scent'
import * as c from '../components'

export default () => (
  createEntity(
    c.Idle,
    c.Position,
    c.IsoPosition,
    c.PointerContext,
  )
)
