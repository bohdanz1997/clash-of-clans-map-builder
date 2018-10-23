import { pipe } from 'core/util'
import { createEntity } from 'core/factories'

export const pipeHOCs = (...HOCs) => pipe(...HOCs)()

export const withComponents = (...components) => () => createEntity(...components)
