import { Entity } from 'scent'

export const createEntity = (...components) => new Entity(components)
