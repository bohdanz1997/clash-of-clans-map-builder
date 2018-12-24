import { Point } from 'core/pixi'

export const makeIsoPointer = ({ pointer, world, matrix, config }) => {
  const cursorOffset = new Point(config.hTileWidth, 0)

  Object.defineProperties(pointer, {
    cartPosition: {
      get() {
        const pos = Point.sub(this.position, world.position).sub(cursorOffset)
        return matrix.apply(pos)
      },
      enumerable: true,
      configurable: true,
    },

    fieldPosition: {
      get() {
        return this.cartPosition.divNum(config.cellWidth).floor()
      },
      enumerable: true,
      configurable: true,
    },
  })
}
