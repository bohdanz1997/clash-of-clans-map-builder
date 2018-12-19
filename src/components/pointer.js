import { Point } from 'core/pixi'
import { makePointer } from 'core/input'
import { createComponent } from 'core/factories'

export const [cPointer, Pointer] = createComponent(
  'pointer', 'pointer dragTarget dragOffset',
  ({ element, scale }) => ({
    pointer: makePointer({
      element,
      scale,
    }),
    dragTarget: null,
    dragOffset: Point.EMPTY,
  })
)
