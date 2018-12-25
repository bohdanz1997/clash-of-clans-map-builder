import './mixins/entity'

import EntityManager from './EntityManager'
import SystemManager from './SystemManager'

/**
 * @typedef Component
 */

/**
 * @typedef Entity
 * @property {number} size
 * @property {Function} get
 * @property {Function} has
 */

/**
 * @typedef Node
 * @property {number} size
 * @property {Function} each
 */

/**
 * @typedef Engine
 * @property {Function} addEntity
 * @property {Function} addSystem
 * @property {Function} addSystems
 * @property {Function} destroyEntity
 * @property {Function} start
 * @property {Function} onUpdate
 * @property {Function} update
 * @property {Function} getNodeType
 */

export { Engine } from 'scent2'

export * from './entity'
export * from './system'
export * from './component'
export * from './node'

export {
  EntityManager,
  SystemManager,
}
