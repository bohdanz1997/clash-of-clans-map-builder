// @flow
import type { GameConfig } from 'types/game'

const width = 1300
const height = 600
const tileWidth = 133
const tileHeight = 100
const widthInTiles = 5
const heightInTiles = 5
const cellsInTile = 3
const cartTileSize = tileWidth / 2
const cartCellSize = cartTileSize / cellsInTile

export const targetEl = document.body

export const gameConfig: GameConfig = {
  width,
  height,
  hWidth: width / 2,
  hHeight: height / 2,
  tileWidth,
  tileHeight,
  hTileWidth: tileWidth / 2,
  hTileHeight: tileHeight / 2,
  widthInTiles,
  heightInTiles,
  worldWidth: widthInTiles * tileHeight,
  worldHeight: heightInTiles * tileHeight,
  cellsInTile,
  cartTileSize,
  cartCellSize,
  cartWorldWidth: cartTileSize * widthInTiles,
  cartWorldHeight: cartTileSize * heightInTiles,
}
