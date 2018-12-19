import { createComponent } from 'core/scent'

// add drag and drop functionality
export const [cDraggable, Draggable] = createComponent(
  'draggable', 'prevPos'
)
