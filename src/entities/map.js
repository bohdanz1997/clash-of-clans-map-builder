import { createEntity } from 'core/scent'
import * as c from '../components'

export default ({
  data: { width, height, layers },
}) => (
  createEntity(
    c.Map({ width, height, layers }),
  )
)
