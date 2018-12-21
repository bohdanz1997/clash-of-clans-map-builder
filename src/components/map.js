import { defComponent } from 'core/scent'
import { TileMap } from 'core/tilemap'

export const Map = defComponent(
  'map', 'gameField',
  ({ width, height, layers }) => ({
    gameField: new TileMap(width, height, layers),
  })
)
