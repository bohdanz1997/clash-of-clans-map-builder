import { createEntity } from 'core/scent'
import * as c from '../components'

export default () => (
  createEntity(
    c.Position,
    c.IsoPosition,
    c.PointerContext,
  )
)
