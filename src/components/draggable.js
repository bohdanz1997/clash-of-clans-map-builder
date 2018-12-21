import { createComponent } from 'core/scent'

// add drag and drop functionality
export const [cDraggable, Draggable] = createComponent(
  'draggable', 'didDrop startPos',
  () => ({ didDrop: false, startPos: null })
)
