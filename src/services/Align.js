import { Point } from 'core/pixi'

export class Align {
  constructor({ app }) {
    this.bounds = app.screen.clone()
  }

  topLeft = offset => Point.of(offset.x, offset.y)

  topRight = offset => Point.of(this.bounds.right - offset.x, offset.y)

  bottomLeft = offset => Point.of(offset.x, this.bounds.bottom - offset.y)

  bottomRight = offset => Point.of(this.bounds.right - offset.x, this.bounds.bottom - offset.y)
}
