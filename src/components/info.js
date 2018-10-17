import { createComponent } from '../core/factories'

export const [cInfo, Info] = createComponent(
  'info', 'entityType',
  ({ entityType }) => ({ entityType })
)
