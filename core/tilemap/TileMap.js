import { TileMapConfig, MapLayer } from '.'

export default class TileMap {
  constructor(config) {
    this.config = new TileMapConfig(config)

    this.width = this.config.width
    this.height = this.config.height

    /** @type {Map<string, MapLayer>} */
    this.layers = new Map()
  }

  /**
   * @param {string} name
   * @param {Object} options
   * @param {Object} [options.width]
   * @param {Object} [options.height]
   * @param {Object} [options.fillId=null]
   * @param {Array} [options.objects=[]]
   * @return {MapLayer}
   */
  createLayer(name, options = {}) {
    this.checkLayer(name)

    const {
      width = this.width,
      height = this.height,
      objects = [],
    } = options

    const layer = new MapLayer(name, width, height)
    layer.objects = objects

    this.layers.set(name, layer)

    return layer
  }

  /**
   * @param {*} id
   * @param {Object} options
   * @param {Object} [options.width]
   * @param {Object} [options.height]
   * @param {Object} entityMeta
   */
  createEntitiesForLayer(id, options = {}, entityMeta = {}) {
    const {
      width = this.width,
      height = this.height,
    } = options

    const totalTilesCount = width * height
    const entitiesData = []

    for (let i = 0; i < totalTilesCount; i++) {
      const column = i % width
      const row = Math.floor(i / height)
      const x = column * this.config.cellsInTile
      const y = row * this.config.cellsInTile

      entitiesData[i] = {
        id,
        x,
        y,
        ...entityMeta,
      }
    }

    return entitiesData
  }

  getLayer(name) {
    const layer = this.layers.get(name)

    if (!layer) {
      throw new Error(`Could not find layer '${name}'`)
    }

    return layer
  }

  hasLayer(name) {
    return this.layers.has(name)
  }

  checkLayer(name) {
    if (!name) {
      throw new Error('Layer name should be defined')
    }

    if (this.hasLayer(name)) {
      throw new Error(`Layer ${name} has been already added to current tilemap`)
    }
  }
}
