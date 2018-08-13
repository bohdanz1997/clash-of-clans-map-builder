import { createEntity } from '../factories'

import {
  createMotion,
  createPosition,
} from '../../components'

export const createArcher = ({ x, y, speed }) => (
  createEntity(
    createPosition({ x, y }),
    createMotion({ velX: speed, velY: speed })
  )
)
