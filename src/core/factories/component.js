import { Component } from 'scent'
import { identity } from "../util"

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
