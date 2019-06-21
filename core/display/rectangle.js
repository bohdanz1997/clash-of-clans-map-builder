import { Graphics } from 'core/pixi'

export const rectangleFactory = {
  create({ width, height, color }) {
    const rect = new Graphics()

    rect.beginFill(color)
    rect.moveTo(0, 0)
    rect.lineTo(width, 0)
    rect.lineTo(width, height)
    rect.lineTo(0, height)
    rect.lineTo(0, 0)
    rect.endFill()

    return rect
  },
}
