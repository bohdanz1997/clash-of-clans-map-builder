export class Layer {
  constructor(width, height, name) {
    this.cells = []
    this.name = name
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

  fixCoords(x, y) {
    if (x < 0) x = 0
    else if (x > this.width - 1) x = this.width - 1

    if (y < 0) y = 0
    else if (y > this.height - 1) y = this.height - 1

    return { x, y }
  }

  setIn(x, y, state) {
    const fixedCoords = this.fixCoords(x, y)
    this.cells[fixedCoords.x][fixedCoords.y] = state
  }

  getIn(x, y) {
    const fixedCoords = this.fixCoords(x, y)
    return this.cells[fixedCoords.x][fixedCoords.y]
  }

  setInSize(x, y, state, size = 1) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.setIn(x + i, y + j, state)
      }
    }
  }

  getInSize(x, y, size = 1) {
    const cells = []
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        cells.push(this.getIn(x + i, y + j))
      }
    }
    return cells
  }

  isEmptyIn(x, y) {
    return this.getIn(x, y) === Layer.EMPTY_CELL
  }

  isEmptyInSize(x, y, size) {
    const cells = this.getInSize(x, y, size)
    return cells.every(cell => cell === Layer.EMPTY_CELL)
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
