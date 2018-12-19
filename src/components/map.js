import { createComponent } from 'core/scent'
import { GameField } from 'core/tools'

export const [cMap, Map] = createComponent(
  'map', 'gameField',
  ({ width, height, layers }) => ({
    gameField: new GameField(width, height, layers),
  })
)
