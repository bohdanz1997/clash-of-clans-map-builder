export class EntityDataMapper {
  constructor({ map }) {
    /** @type {TileMapConfig} */
    this.mapConfig = map.config
  }

  mapCellCoords(data) {
    return {
      ...data,
      x: data.col * this.mapConfig.cellWidth,
      y: data.row * this.mapConfig.cellHeight,
    }
  }

  map = (data) => {
    const hasCellCoords = 'col' in data && 'row' in data

    if (hasCellCoords) {
      data = this.mapCellCoords(data)
    }

    return data
  }
}
