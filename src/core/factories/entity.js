import { Entity } from 'scent'
import { pipe } from '../util'

export const createEntity = (...components) => new Entity(components)
export const buildEntity = (...components) => () => createEntity(...components)
export const pipeEntity = (...factories) => pipe(...factories)()
