import { Point } from 'core/pixi'
import { pointerManager } from 'core/input'
import { createComponent } from 'core/scent'

export const [cPointer, Pointer] = createComponent(
  'pointer', 'pointer dragTarget dragOffset',
  ({ element, scale }) => ({
    pointer: pointerManager.create({
      element,
      scale,
    }),
    dragTarget: null,
    dragOffset: Point.EMPTY,
  })
)
