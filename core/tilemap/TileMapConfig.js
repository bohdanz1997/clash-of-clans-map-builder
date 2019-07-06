import { prop } from '../util'

export default class TileMapConfig {
  /**
   * @param {Object} config
   * @param {number} [config.width=10]
   * @param {number} [config.height=10]
   * @param {number} [config.tileWidth=66.5]
   * @param {number} [config.tileHeight=66.5]
   * @param {number} [config.hIsoTileWidth=133]
   * @param {number} [config.isoTileHeight=100]
   * @param {number} [config.cellsInTile=3]
   */
  constructor(config) {
    const get = prop(config)

    // width in tiles
    this.width = get('width', 10)

    // height in tiles
    this.height = get('height', 10)

    // tile width/height in pixels
    this.tileSize = get('tileSize', 66.5)

    // tile width in pixels
    this.tileWidth = get('tileWidth', 66.5)

    // tile height in pixels
    this.tileHeight = get('tileHeight', 66.5)

    // iso tile width in pixels
    this.isoTileWidth = get('isoTileWidth', 133)

    // iso tile height in pixels
    this.isoTileHeight = get('isoTileHeight', 100)

    // cells amount in tile
    this.cellsInTile = get('cellsInTile', 3)
  }

  // half iso tile width in pixels
  get hIsoTileWidth() {
    return this.isoTileWidth / 2
  }

  // half iso tile height in pixels
  get hIsoTileHeight() {
    return this.isoTileHeight / 2
  }

  get cellSize() {
    return this.tileSize / this.cellsInTile
  }

  get cellWidth() {
    return this.tileWidth / this.cellsInTile
  }

  get cellHeight() {
    return this.tileWidth / this.cellsInTile
  }

  get hTileWidth() {
    return this.tileWidth / 2
  }

  get hTileHeight() {
    return this.tileHeight / 2
  }

  // map width in cells
  get widthInCells() {
    return this.cellsInTile * this.width
  }

  // map height in cells
  get heightInCells() {
    return this.cellsInTile * this.height
  }

  // map width in pixels
  get widthInPixels() {
    return this.tileWidth * this.width
  }

  // map height in pixels
  get heightInPixels() {
    return this.tileHeight * this.height
  }

  // map iso width in pixels
  get isoWidthInPixels() {
    return this.isoTileWidth * this.width
  }

  // map iso height in pixels
  get isoHeightInPixels() {
    return this.isoTileHeight * this.height
  }
}
