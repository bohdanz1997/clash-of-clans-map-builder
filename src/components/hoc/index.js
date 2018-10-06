import * as c from '..'
import { pipe } from '../../core/util'
import { createSprite } from '../../core/pixi'
import { createEntity } from '../../core/factories'

export const pipeHOCs = (...HOCs) => pipe(...HOCs)()

export const withComponents = (...components) => () => createEntity(...components)

export const withDisplay = texture => (entity) => {
  const sprite = createSprite(texture)
  return entity.add(c.Display({ sprite }))
}
