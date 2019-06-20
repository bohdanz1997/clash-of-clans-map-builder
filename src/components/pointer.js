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

export const PointerContext = defComponent(
  'context', 'processor isDown isUp tapped visible hovered downTime elapsedTime',
  () => ({
    processor: null,
    isDown: false,
    isUp: true,
    tapped: false,
    visible: true,
    hovered: false,
    downTime: 0,
    elapsedTime: 0,
  })
)
