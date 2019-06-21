import { createEntity } from 'core/scent'
import * as c from '../components'

export default ({
  data: { client, source },
}) => (
  createEntity(
    c.Interact.Initiator({ entity: client }),
    c.Interact.Target({ entity: source }),
  )
)
