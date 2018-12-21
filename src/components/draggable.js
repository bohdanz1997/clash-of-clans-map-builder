import { defComponent } from 'core/scent'

// add drag and drop functionality
export const Draggable = defComponent(
  'draggable', 'didDrop startPos',
  () => ({ didDrop: false, startPos: null })
)
