import { Entity } from 'scent2'
import { isFunction } from 'core/util'

export const createEntity = (...componentTypes) => {
  const entity = new Entity()
  componentTypes.forEach((type) => {
    if (type instanceof Branch) {
      type.exec(entity)
    } else if (isFunction(type)) {
      entity.add(type({ entity }))
    } else {
      entity.add(type)
    }
  })
  return entity
}

class Branch {
  constructor(condition, left, right) {
    this.condition = condition
    this.left = left
    this.right = right
  }

  exec(entity) {
    const component = this.condition ? this.left : this.right
    if (component) {
      entity.add(component)
    }
  }
}

export const branch = (condition, left, right) => new Branch(condition, left, right)
