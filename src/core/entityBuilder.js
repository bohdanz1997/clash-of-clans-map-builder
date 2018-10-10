import { stringifyJSON } from './util'

export default (engine, config, entitiesFactories) => {
  const buildEntity = (entityParams) => {
    const { id } = entityParams
    if (id === undefined) {
      throw new Error(`Entity params must include 'id', got params: \n${stringifyJSON(entityParams)}`)
    }

    const entityFactory = entitiesFactories[id]
    if (!entityFactory) {
      throw new Error(`Could not find entity factory for id '${id}'`)
    }

    return entityFactory(entityParams, config)
  }

  return (entityParams) => {
    const entity = buildEntity(entityParams)
    engine.addEntity(entity)
  }
}
