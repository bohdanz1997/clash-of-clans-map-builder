export default (engine, app, entities) => {
  const buildEntity = entityParams => {
    const { entityType } = entityParams
    if (entityType === undefined) {
      throw new Error(`Entity params must include 'entityType'`)
    }

    const entityFactory = entities[entityType]
    if (!entityFactory) {
      throw new Error(`Could not find entity factory for '${entityType}'`)
    }

    return entityFactory(entityParams, app)
  }

  return (entityParams) => {
    const entity = buildEntity(entityParams)
    engine.addEntity(entity)
  }
}
