import { createEntity } from 'core/ecs'
import * as c from '../components'

export const Input = () => (
  createEntity(
    c.Input(),
  )
)
