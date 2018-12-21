import { Component } from 'scent2'
import { identity } from '../util'

export const createComponent = (name, definition, paramResolver = identity) => {
  const ComponentType = new Component(name, definition)
  const componentFactory = (params = {}) => {
    const component = new ComponentType()
    const paramEntries = Object.entries(paramResolver(params))
    paramEntries.forEach(([innerName, value]) => {
      component[innerName] = value
    })
    return component
  }
  return [ComponentType, componentFactory]
}

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
