import { Entity } from 'scent2'
import { isFunction } from 'core/util'

export const createEntity = (...componentTypes) => {
  const entity = new Entity()
  componentTypes.forEach((type) => {
    if (isFunction(type)) {
      entity.add(type({ entity }))
    } else {
      entity.add(type)
    }
  })
  return entity
}
