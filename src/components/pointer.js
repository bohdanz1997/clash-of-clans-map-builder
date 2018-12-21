import { pointerManager } from 'core/input'
import { defComponent } from 'core/scent'

export const Pointer = defComponent(
  'pointer', 'pointer dragTarget dragOffset',
  ({ element, scale }) => ({
    input: pointerManager.create({
      element,
      scale,
    }),
  })
)
