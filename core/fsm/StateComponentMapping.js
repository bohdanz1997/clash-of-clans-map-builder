import { ComponentInstanceProvider } from './ComponentInstanceProvider'

export class StateComponentMapping {
  componentType

  /** @type {EntityState} */
  creatingState
  provider

  constructor(creatingState, type) {
    this.creatingState = creatingState
    this.componentType = type
    this.withInstance(type)
  }

  /**
   * @param component
   * @return {StateComponentMapping}
   */
  withInstance(component) {
    this.setProvider(new ComponentInstanceProvider(component))
    return this
  }

  setProvider(provider) {
    this.provider = provider
    this.creatingState.set(this.componentType, provider)
  }

  add(type) {
    return this.creatingState.add(type)
  }
}
