import { Component } from 'scent2'
import { identity } from '../util'
import { Describer } from './Describer'

class DefaultComponentFactory {
  // eslint-disable-next-line no-empty-function,no-useless-constructor
  constructor(param) {}
}

export const component = (name, ComponentFactory = DefaultComponentFactory, dataResolver = identity) => {
  if (typeof ComponentFactory === 'string') {
    return new Component(name, ComponentFactory, dataResolver)
  }

  const props = Describer.getProps(ComponentFactory)
  const definition = props.join(' ')
  const resolver = (...args) => new ComponentFactory(...args)

  return new Component(name, definition, resolver)
}
