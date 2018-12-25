import { createEntity } from 'core/scent'
import * as c from '../components'

export const Pointer = ({ config }) => (
  createEntity(
    c.Identity(),
    c.Position(),
    c.DragSource(),
    c.Pointer({
      element: config.inputTouchEventTarget,
    }),
  )
)
