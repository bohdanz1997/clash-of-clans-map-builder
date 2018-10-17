import { createEntity } from '../core/factories'
import * as c from '../components'
import { tink } from '../services'

export default () => (
  createEntity(
    c.Pointer({
      pointer: tink.makePointer(),
    }),
  )
)
