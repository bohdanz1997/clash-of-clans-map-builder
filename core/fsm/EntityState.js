import { StateComponentMapping } from './StateComponentMapping'

export class EntityState {
  /** @type {Map<ComponentType, ComponentInstanceProvider>} */
  providers = new Map()

  add(type) {
    return new StateComponentMapping(this, type)
  }

  get(type) {
    return this.providers.get(type)
  }

  has(type) {
    return this.providers.has(type)
  }

  set(type, provider) {
    this.providers.set(type, provider)
  }
}
