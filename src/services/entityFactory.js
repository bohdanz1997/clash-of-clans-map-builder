import { makeEntityParams } from 'core/jsonMapParser'
import appConfig from '../config/app'

const { entityDefinitions } = appConfig

export const createEntityFactory = entityBuilder => ({
  create(entityData) {
    const entityParams = makeEntityParams(entityDefinitions, entityData)
    return entityBuilder(entityParams)
  },
})
