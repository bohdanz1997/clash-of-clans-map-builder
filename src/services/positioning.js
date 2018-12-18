import { Point } from 'core/pixi'

export const createPositioning = (gameConfig, app) => {
  const bounds = app.screen.clone()

  return {
    topLeft: offset => Point.of(offset.x, offset.y),
    topRight: offset => Point.of(bounds.right - offset.x, offset.y),
    bottomLeft: offset => Point.of(offset.x, bounds.bottom - offset.y),
    bottomRight: offset => Point.of(bounds.right - offset.x, bounds.bottom - offset.y),
  }
}
