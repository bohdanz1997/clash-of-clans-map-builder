import * as c from '..'
import { createSprite } from 'core/factories'
import { makeIsoRectSprite, makeRectSprite } from 'core/graphics'

export const withDisplay = texture => (entity) => {
  const sprite = createSprite(texture)
  return entity.add(c.Display({ sprite }))
}

export const withIsoDisplay = (texture, width, height) => (entity) => {
  const sprite = createSprite(texture, 0, 0, width, height)
  return entity.add(c.Display({ sprite }))
}

export const withRectDisplay = (width, height, color) => (entity) => {
  const sprite = makeRectSprite(width, height, color)
  return entity.add(c.Display({ sprite }))
}

export const withIsoRectDisplay = (width, height, color) => (entity) => {
  const sprite = makeIsoRectSprite(width, height, color)
  return entity.add(c.Display({ sprite }))
}
