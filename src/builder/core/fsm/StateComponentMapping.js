import { ComponentInstanceProvider } from './ComponentInstanceProvider'
import { DynamicComponentProvider } from './DynamicComponentProvider'

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

  /**
   * @param callback
   * @return {StateComponentMapping}
   */
  withCallback(callback) {
    this.setProvider(new DynamicComponentProvider(callback))
    return this
  }

  setProvider(provider) {
    this.provider = provider
    this.creatingState.set(this.componentType, provider)
  }

  /**
   * @param type
   * @return {StateComponentMapping}
   */
  add(type) {
    return this.creatingState.add(type)
  }
}
