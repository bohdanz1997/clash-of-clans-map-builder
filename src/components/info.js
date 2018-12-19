import { createComponent } from 'core/scent'

export const [cInfo, Info] = createComponent(
  'info', 'entityType',
  ({ entityType }) => ({ entityType })
)
