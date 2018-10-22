import { createComponent } from '../core/factories'
import { GameField } from '../core/tools'

export const [cMap, Map] = createComponent(
  'map', 'gameField',
  ({ width, height, layers }) => ({
    gameField: new GameField(width, height, layers),
  })
)
