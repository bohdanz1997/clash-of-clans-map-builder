import { createComponent } from 'core/scent'
import { TileMap } from 'core/tilemap'

export const [cMap, Map] = createComponent(
  'map', 'gameField',
  ({ width, height, layers }) => ({
    gameField: new TileMap(width, height, layers),
  })
)
