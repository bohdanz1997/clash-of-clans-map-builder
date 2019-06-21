import { TileMapConfig, MapLayer } from '.'
import { identity } from '../util'

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
      width = this.config.widthInCells,
      height = this.config.heightInCells,
      objects = [],
    } = options

    const layer = new MapLayer(name, width, height)
    layer.objects = objects

    this.layers.set(name, layer)

    return layer
  }

  /**
   * @param {*} id
   * @param {Object} entityMeta
   */
  generateObjects(id, entityMeta = {}) {
    const { width, height } = this
    const totalTilesCount = width * height
    const entitiesData = []

    for (let i = 0; i < totalTilesCount; i++) {
      const column = i % width
      const row = Math.floor(i / height)
      const cx = column * this.config.cellsInTile
      const cy = row * this.config.cellsInTile

      entitiesData[i] = {
        id,
        cx,
        cy,
        ...entityMeta,
      }
    }

    return entitiesData
  }

  /**
   * @param {string} name
   * @returns {MapLayer}
   */
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

  /**
   * @param {string} layerName
   * @param {Function} mapper
   * @return {Array}
   */
  getLayerObjects(layerName, mapper = identity) {
    return this.getLayer(layerName).objects.map(object => mapper(object))
  }

  /**
   * @param {Function} mapper
   * @return {Array}
   */
  getAllObjects(mapper = identity) {
    const objects = []
    this.layers.forEach((layer) => {
      layer.objects.forEach((object) => {
        objects.push(mapper(object))
      })
    })
    return objects
  }
}
