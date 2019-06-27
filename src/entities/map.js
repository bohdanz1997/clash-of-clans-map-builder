import { createEntity } from 'core/ecs'
import * as c from '../components'

export const Map = ({
  data: { width, height, layers },
}) => (
  createEntity(
    c.Map({ width, height, layers }),
  )
)
