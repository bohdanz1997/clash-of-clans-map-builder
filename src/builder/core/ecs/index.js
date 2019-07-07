/**
 * @typedef Component
 */

/**
 * @typedef ComponentType
 * @property {number} size
 */

/**
 * @typedef Entity
 * @property {number} size
 * @property {function(ComponentType|Component)} add
 * @property {function(ComponentType|Component)} remove
 * @property {function(ComponentType): Component} get
 * @property {function(): boolean} has
 */

/**
 * @typedef Node
 * @property {number} size
 * @property {function} each
 */

/**
 * @typedef Engine
 * @property {function(Entity)} addEntity
 * @property {function} addSystem
 * @property {function} addSystems
 * @property {function} destroyEntity
 * @property {function} start
 * @property {function} onUpdate
 * @property {function} update
 * @property {function} getNodeType
 */

export { Engine, Symbols } from 'scent2'
export { EntityBuilder, EntityManager } from './EntityManager'
export { SystemManager } from './SystemManager'
export { createEntity, branch } from './entity'
export { component } from './component'
export { nodeEachTwice } from './node'

export * from './system-hooks'
