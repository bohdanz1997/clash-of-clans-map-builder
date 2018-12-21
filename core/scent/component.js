import { Component } from 'scent2'
import { identity } from '../util'

export const defComponent = (name, definition, paramResolver = identity) => {
  const applyMixin = (ComponentType) => {
    ComponentType.of = createComponentFactory(ComponentType)
  }

  const createComponentFactory = ComponentType => (params = {}) => {
    const component = new ComponentType()
    const paramEntries = Object.entries(paramResolver(params))
    paramEntries.forEach(([innerName, value]) => {
      component[innerName] = value
    })
    return component
  }

  return new Component(name, definition, applyMixin)
}
