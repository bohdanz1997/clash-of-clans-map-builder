import { stringifyJSON, pipe } from 'core/util'

export default (config) => {
  const {
    scope,
    entityFactories,
    entityParamsProvider,
  } = config

  const entityBuilder = (entityParams) => {
    const { id } = entityParams
    if (id === undefined) {
      throw new Error(`Entity params must include 'id', got params: \n${stringifyJSON(entityParams)}`)
    }

    const entityFactory = entityFactories[id]
    if (!entityFactory) {
      throw new Error(`Could not find entity factory for id '${id}'`)
    }

    return entityFactory(entityParams, scope)
  }

  return pipe(
    entityParamsProvider,
    entityBuilder,
  )
}
