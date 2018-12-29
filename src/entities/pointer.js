import { createEntity } from 'core/scent'
import * as c from '../components'

export const Pointer = ({ config }) => (
  createEntity(
    c.Identity(),
    c.Position(),
    c.Idle,
    c.DragSource(),
    c.Pointer({
      element: config.inputTouchEventTarget,
    }),
  )
)
