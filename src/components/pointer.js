import { createComponent } from 'core/factories'
import { Point } from 'core/pixi'

export const [cPointer, Pointer] = createComponent(
  'pointer', 'pointer dragTarget dragOffset',
  ({ pointer }) => ({
    pointer,
    dragTarget: null,
    dragOffset: Point.EMPTY,
  })
)
