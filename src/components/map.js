import { component } from 'core/scent'
import { TileMap } from 'core/tilemap'

export const Map = component(
  'map', 'gameField',
  ({ width, height, layers }) => ({
    gameField: new TileMap(width, height, layers),
  })
)
