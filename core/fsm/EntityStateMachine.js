import { EntityState } from './EntityState'

export class EntityStateMachine {
  /** @type {Map<string, EntityState>} */
  states = new Map()

  /** @type {EntityState} */
  currentState

  /** @type {Entity} */
  entity

  constructor(entity) {
    this.entity = entity
  }

  addState(name, state) {
    this.states.set(name, state)
    return this
  }

  createState(name) {
    const state = new EntityState()
    this.states.set(name, state)
    return state
  }

  changeState(name, params) {
    const newState = this.states.get(name)

    if (!newState) {
      throw new Error(`Entity state ${name.toString()} doesn't exist`)
    }

    if (newState === this.currentState) {
      return
    }

    const toAdd = this.getProvidersToAdd(newState)

    toAdd.forEach((componentProvider, type) => {
      this.entity.add(componentProvider.getComponent(params), type)
    })

    this.currentState = newState
  }

  /**
   * @param {EntityState} newState
   * @return {Map<ComponentType, ComponentProvider>}
   */
  getProvidersToAdd(newState) {
    if (!this.currentState) {
      return newState.providers
    }

    const toAdd = new Map(newState.providers)

    this.currentState.providers.forEach((provider, type) => {
      const other = toAdd.get(type)

      if (other && other.getIdentifier() === provider.getIdentifier()) {
        toAdd.delete(type)
      } else {
        this.entity.remove(type)
      }
    })

    return toAdd
  }
}
