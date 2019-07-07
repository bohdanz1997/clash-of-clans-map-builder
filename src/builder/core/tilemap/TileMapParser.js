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

  makeEntityParams = (data) => {
    const { level, id } = data
    const def = data.def || id

    const entityDefinition = this.definitions[def] || {}
    const levelDefinition = entityDefinition.levels ? entityDefinition.levels[level] : {}

    return {
      ...entityDefinition,
      ...levelDefinition,
      ...data,
    }
  }
}
