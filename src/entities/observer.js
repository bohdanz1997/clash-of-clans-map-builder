import { createEntity } from 'core/scent'
import * as c from '../components'

export default ({ client, source }) => (
  createEntity(
    c.Interact.Client.of({ entity: client }),
    c.Interact.Source.of({ entity: source }),
  )
)
