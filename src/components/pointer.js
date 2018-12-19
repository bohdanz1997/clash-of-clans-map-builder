import { pointerManager } from 'core/input'
import { createComponent } from 'core/scent'

export const [cPointer, Pointer] = createComponent(
  'pointer', 'pointer dragTarget dragOffset',
  ({ element, scale }) => ({
    input: pointerManager.create({
      element,
      scale,
    }),
  })
)
