import { createComponent } from 'core/scent'

export const [cDragContext, DragContext] = createComponent(
  'dragContext', 'startPos offsetFromClient'
)
