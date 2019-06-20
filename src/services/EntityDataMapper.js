export class EntityDataMapper {
  constructor(mapConfig) {
    /** @type {TileMapConfig} */
    this.mapConfig = mapConfig
  }

  mapCellCoords(data) {
    return {
      ...data,
      x: data.cx * this.mapConfig.cellWidth,
      y: data.cy * this.mapConfig.cellHeight,
    }
  }

  map = (data) => {
    const hasCellCoords = 'cx' in data && 'cy' in data

    if (hasCellCoords) {
      data = this.mapCellCoords(data)
    }

    return data
  }
}
