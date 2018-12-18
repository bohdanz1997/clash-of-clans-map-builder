// @flow
import type { GameConfig } from 'types/game'

const width = 800
const height = 600
const tileWidth = 133
const tileHeight = 100
const widthInTiles = 10
const heightInTiles = 10
const cellsInTile = 3
const cartTileSize = tileWidth / 2
const cartCellSize = cartTileSize / cellsInTile

export const targetEl = document.body

export const game: GameConfig = {
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
  widthInCells: widthInTiles * cellsInTile,
  heightInCells: heightInTiles * cellsInTile,
  worldWidth: widthInTiles * tileHeight,
  worldHeight: heightInTiles * tileHeight,
  cellsInTile,
  cartTileSize,
  cartCellSize,
  cartWorldWidth: cartTileSize * widthInTiles,
  cartWorldHeight: cartTileSize * heightInTiles,
}

export const pixi = {
  antialias: true,
  transparent: false,
  resolution: 1,
  width: game.width,
  height: game.height,
}

export const priorities = {
  PRE_INIT: 0,
  PRE_UPDATE: 10,
  MOVEMENT: 11,
  UPDATE_COLLISION: 12,
  RESOLVE_COLLISIONS: 13,
  UPDATE: 15,
  PRE_RENDER: 18,
  RENDER: 19,
  ISO_RENDER: 20,
  POST_UPDATE: 25,
}

export default {
  pixi,
  game,
  targetEl,
  priorities,
}
