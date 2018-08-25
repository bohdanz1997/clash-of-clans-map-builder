import { createComponent } from '../core/factories'

export const [cInfo, Info] = createComponent('info', 'type', ({ type }) => ({
  type,
}))
