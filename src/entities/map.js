import { createEntity } from 'core/scent'
import * as c from '../components'

export default ({ width, height, layers }) => (
  createEntity(
    c.Map.of({ width, height, layers }),
  )
)
