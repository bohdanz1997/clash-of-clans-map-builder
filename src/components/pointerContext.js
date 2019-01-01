import { defComponent } from 'core/scent'

// Pointer context
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
