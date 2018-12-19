import { makeEntityParams } from 'core/jsonMapParser'
import appConfig from '../config/app'

const { entityDefinitions } = appConfig

export const createEntityFactory = entityBuilder => ({
  create(id, entityData = {}) {
    const entityParams = makeEntityParams(entityDefinitions, { id, ...entityData })
    return entityBuilder(entityParams)
  },
})
