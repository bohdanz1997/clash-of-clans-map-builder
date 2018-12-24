import {
  TileMap,
  TileMapConfig,
} from '.'

export default class Parser {
  constructor(definitions) {
    this.definitions = definitions
  }

  fromJSON(data) {
    const {
      width,
      height,
      layers,
    } = data

    const mapConfig = new TileMapConfig({
      width,
      height,
    })

    const map = new TileMap(mapConfig)

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
