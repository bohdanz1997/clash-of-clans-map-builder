import { createEntity } from 'core/ecs'
import * as c from '../components'

export const Serializer = () => createEntity(
  c.Serializer(),
)
