import { identity } from 'core/util'
import { TileMap } from '.'

export default class Parser {
  constructor(definitions) {
    this.definitions = definitions
  }

  /**
   * @param data
   * @returns {TileMap}
   */
  fromJSON(data) {
    const {
      width,
      height,
      layers,
    } = data

    const map = new TileMap({
      width,
      height,
    })

    layers.forEach((layerData) => {
      const entitiesData = layerData.data.map(itemData => (
        this.makeEntityParams(itemData)
      ))

      map.createLayer(layerData.name, {
        objects: entitiesData,
      })
    })

    return map
  }

  /**
   * @param {TileMap} tileMap
   * @param {Function} mapper
   * @return {Array}
   */
  getObjects(tileMap, mapper = identity) {
    const objects = []
    tileMap.layers.forEach((layer) => {
      layer.objects.forEach((object) => {
        objects.push(mapper(object))
      })
    })
    return objects
  }

  getDefinition(id) {
    const definition = this.definitions[id]
    if (!definition) {
      throw new Error(`Could not find entity definition for '${id}'`)
    }
    return definition
  }

  makeEntityParams = (data) => {
    const { level, id } = data
    const def = data.def || id

    const entityDefinition = this.getDefinition(def)
    const levelDefinition = entityDefinition.levels ? entityDefinition.levels[level] : {}

    return {
      ...entityDefinition,
      ...levelDefinition,
      ...data,
    }
  }
}
