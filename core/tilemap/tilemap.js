import { Layer } from './layer'

export class TileMap {
  constructor(width, height, layers) {
    this.init(width, height)
    this.initLayers(layers)
  }

  init(width, height) {
    this.width = width
    this.height = height
  }

  initLayers(layers) {
    this.layers = layers.reduce((acc, layer) => ({
      ...acc,
      [layer]: new Layer(this.width, this.height, layer),
    }), {})
  }

  getLayer(name) {
    const layer = this.layers[name]
    if (!layer) {
      throw new Error(`Could not find layer '${name}'`)
    }
    return layer
  }
}
