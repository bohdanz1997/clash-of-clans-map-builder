import { pipe } from 'core/util'
import { createEntity } from 'core/scent'

export const pipeHOCs = (...HOCs) => pipe(...HOCs)()

export const withComponents = (...components) => () => createEntity(...components)
