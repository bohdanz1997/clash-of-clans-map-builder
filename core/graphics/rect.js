import { Graphics, Sprite } from 'core/pixi'
import { isoMatrix } from '../isometric'

const makeRect = (width, height, fillStyle) => {
  const rect = new Graphics()
  rect.beginFill(fillStyle)
  rect.moveTo(0, 0)
  rect.lineTo(width, 0)
  rect.lineTo(width, height)
  rect.lineTo(0, height)
  rect.lineTo(0, 0)
  rect.endFill()
  return rect
}

export const makeRectSprite = (width, height, fillStyle) => {
  const rect = makeRect(width, height, fillStyle)
  return new Sprite(rect.generateCanvasTexture())
}

export const makeIsoRectSprite = (width, height, fillStyle) => {
  const rect = makeRect(width, height, fillStyle)
  const texture = rect.generateCanvasTexture()
  const sprite = new Sprite(texture)
  sprite.pivot.set(-(width / 2), height / 2)
  sprite.transform.setFromMatrix(isoMatrix)
  return sprite
}
