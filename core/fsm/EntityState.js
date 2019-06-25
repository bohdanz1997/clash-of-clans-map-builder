import { StateComponentMapping } from './StateComponentMapping'

export class EntityState {
  /** @type {Map<ComponentType, ComponentProvider>} */
  providers = new Map()

  /** @type {Symbol} */
  name

  constructor(name) {
    this.name = name
  }

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

  get stringName() {
    return this.name.description
  }
}
