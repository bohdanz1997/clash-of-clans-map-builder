import { createComponent } from 'core/factories'

// add drag and drop functionality
export const [cDraggable, Draggable] = createComponent(
  'draggable', 'prevPos'
)
