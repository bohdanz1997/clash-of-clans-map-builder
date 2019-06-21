import { createEntity } from 'core/scent'
import * as c from '../components'

export const Observer = ({
  data: { client, source },
}) => (
  createEntity(
    c.Interact.Initiator({ entity: client }),
    c.Interact.Target({ entity: source }),
  )
)
