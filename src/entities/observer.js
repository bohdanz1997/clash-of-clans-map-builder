import { createEntity } from 'core/scent'
import * as c from '../components'

export const Observer = ({
  data: { client, source },
}) => (
  createEntity(
    c.Interact.Client({ entity: client }),
    c.Interact.Source({ entity: source }),
  )
)
