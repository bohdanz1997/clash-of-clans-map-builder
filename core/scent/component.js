import { Component } from 'scent2'
import { identity } from '../util'

export const defComponent = (name, definition, dataResolver = identity) => (
  new Component(name, definition, dataResolver)
)
