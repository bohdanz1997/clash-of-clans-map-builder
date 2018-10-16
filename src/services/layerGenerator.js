// @flow
import type { GameConfig } from '../types/game'

export const generateGroundLayer = (config: GameConfig) => {
  const createItem = ({ x, y }) => ({ id: 'tile', x, y })
  const layerData = []
  const { widthInTiles } = config
  const totalTilesCount = widthInTiles * widthInTiles

  for (let i = 0; i < totalTilesCount; i++) {
    const column = i % widthInTiles
    const row = Math.floor(i / widthInTiles)
    const x = column * config.cellsInTile
    const y = row * config.cellsInTile

    layerData[i] = createItem({ x, y })
  }

  return {
    name: 'ground',
    data: layerData,
  }
}
