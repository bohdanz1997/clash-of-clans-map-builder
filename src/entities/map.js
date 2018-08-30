import { createEntity } from '../core/factories'
import * as c from '../components'

export default ({ width, height, layers }) => (
  createEntity(
    c.Map({ width, height, layers }),
  )
)
