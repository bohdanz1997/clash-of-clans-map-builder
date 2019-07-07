import { component } from 'core/ecs'
import { TileMap } from 'core/tilemap'

export const Map = component(
  'map', 'gameField',
  ({ width, height, layers }) => ({
    gameField: new TileMap(width, height, layers),
  })
)
