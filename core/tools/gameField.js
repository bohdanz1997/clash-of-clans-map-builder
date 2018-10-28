export class Layer {
  constructor(width, height) {
    this.cells = []
    this.init(width, height)
    this.clear()
  }

  static EMPTY_CELL = -1

  init(width, height) {
    this.width = width
    this.height = height
  }

  clear() {
    this.fillCells(Layer.EMPTY_CELL)
  }

  fillCells(state) {
    for (let x = 0; x < this.width; x++) {
      this.cells[x] = []
      for (let y = 0; y < this.height; y++) {
        this.setIn(x, y, state)
      }
    }
  }

  isValidCords(x, y) {
    return (x >= 0 && y >= 0 && x < this.width && y < this.height)
  }

  setIn(x, y, state) {
    if (!this.isValidCords(x, y)) {
      throw new Error(`Invalid coords [${x}, ${y}] for size [${this.width}, ${this.height}]`)
    }
    this.cells[x][y] = state
  }

  getIn(x, y) {
    if (!this.isValidCords(x, y)) {
      throw new Error(`Invalid coords [${x}, ${y}] for size [${this.width}, ${this.height}]`)
    }
    return this.cells[x][y]
  }

  isEmptyIn(x, y) {
    return this.getIn(x, y) === Layer.EMPTY_CELL
  }

  toString() {
    let str = ''
    const stateToDisplay = state => ({
      [Layer.EMPTY_CELL]: '-',
    })[state] || 'x'

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        str += stateToDisplay(this.getIn(x, y))
      }
      str += '\n'
    }
    return str
  }
}

export class GameField {
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
      [layer]: new Layer(this.width, this.height),
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
