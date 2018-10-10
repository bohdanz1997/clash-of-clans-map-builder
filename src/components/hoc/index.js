import * as c from '..'
import { pipe } from '../../core/util'
import { createSprite, createIsoSprite } from '../../core/pixi'
import { createEntity } from '../../core/factories'

export const pipeHOCs = (...HOCs) => pipe(...HOCs)()

export const withComponents = (...components) => () => createEntity(...components)

export const withDisplay = texture => (entity) => {
  const sprite = createSprite(texture)
  return entity.add(c.Display({ sprite }))
}

export const withIsoDisplay = (texture, width, height) => (entity) => {
  const sprite = createIsoSprite(texture, 0, 0, width, height)
  return entity.add(c.Display({ sprite }))
}
