import { Game } from '../boot'
import { objectReduce, firstToLower, noop, isString } from '../util'
import { createEntity } from './entity'

const getLevelData = (definition, level) => (
  definition.levels ? definition.levels[level] : {}
)

export class EntityBuilder {
  build(Factory, data, dataForInject) {
    return Factory({
      data,
      ...dataForInject,
    })
  }
}

export class EntityManager {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.defs = {}
    this.factories = {}
    this.builder = new EntityBuilder()
    this.engine = game.engine

    // hooks
    this.postBuild = noop
  }

  make(id, components) {
    const entity = createEntity(...components)

    this.postBuild(entity, id)

    return this.engine.addEntity(entity)
  }

  add(id, data = {}, dataForInject = {}) {
    const entity = this.create(id, data, dataForInject)
    return this.engine.addEntity(entity)
  }

  create(idOrFactory, data = {}, dataForInject = {}) {
    const Factory = this.getFactoryIfString(idOrFactory)
    const id = firstToLower(Factory.name)
    const entityData = this.makeEntityData(id, data)

    return this.buildEntity(id, Factory, entityData, dataForInject)
  }

  buildEntity(id, Factory, data = {}, dataForInject = {}) {
    const entity = this.builder.build(Factory, data, dataForInject)

    this.postBuild(entity, id)

    return entity
  }

  makeEntityData(id, params) {
    const {
      level = null,
      def = id,
    } = params

    const definition = this.getDefinition(def)
    const levelData = getLevelData(definition, level)
    const data = { ...params, id, level, def }

    return {
      ...definition,
      ...levelData,
      ...data,
    }
  }

  getFactoryIfString(param) {
    return isString(param)
      ? this.getFactory(param)
      : param
  }

  getDefinition(id) {
    const def = this.defs[id]

    if (!def) {
      return { id }
    }

    return def
  }

  getFactory(id) {
    const factory = this.factories[id]

    if (!factory) {
      const keysStr = Object.keys(this.factories).join(', ')
      throw new Error(`Could not find entity factory for '${id}', available: ${keysStr}`)
    }

    return factory
  }

  setDefinitions(defs) {
    this.defs = defs || {}
  }

  setFactories(factories) {
    this.factories = objectReduce((acc, key, val) => ({
      ...acc,
      [firstToLower(key)]: val,
    }), factories || {})
  }

  setBuilder(builder) {
    this.builder = builder
  }

  getAllDefinitions() {
    return this.defs
  }

  getAllFactories() {
    return this.factories
  }
}
