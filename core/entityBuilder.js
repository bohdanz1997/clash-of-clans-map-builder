import { asFunction } from 'awilix'
import { stringifyJSON } from 'core/util'

export default ({ container, entityFactories }) => (
  (entityParams, dataForInject) => {
    const { id } = entityParams
    if (id === undefined) {
      throw new Error(`Entity params must include 'id', got params: \n${stringifyJSON(entityParams)}`)
    }

    const entityFactory = entityFactories[id]
    if (!entityFactory) {
      throw new Error(`Could not find entity factory for id '${id}'`)
    }

    const entityResolver = asFunction(entityFactory).inject(() => ({
      data: entityParams,
      ...dataForInject,
    }))

    return container.build(entityResolver)
  }
)
