import { noop, isFunction } from '../util'

const defaultHandler = {
  meta: {
    priority: 0,
    enabled: true,
  },
  init: noop,
  before: noop,
  after: noop,
  update: noop,
}

const baseCreateSystem = systemFactory => (handler, meta) => {
  if (isFunction(handler)) {
    const singleUpdateHandler = {
      ...defaultHandler,
      update: handler,
      meta: {
        ...defaultHandler.meta,
        ...meta,
      },
    }
    return systemFactory(singleUpdateHandler)
  }

  const systemHandler = {
    ...defaultHandler,
    ...handler,
    meta: {
      ...defaultHandler.meta,
      ...handler.meta || {},
    },
  }
  return systemFactory(systemHandler)
}

const makeSystem = handler => nodeType => (engine) => {
  if (!handler.meta.enabled) return
  const nodes = engine.getNodeType(nodeType)
  engine.onUpdate((delta) => {
    handler.before(delta)
    nodes.each(node => handler.update(node, delta))
    handler.after(delta)
  })
  handler.init(nodes)
}

const makeEnhancedSystem = handler => (...arrayOfNodeTypes) => (engine) => {
  if (!handler.meta.enabled) return
  const arrayOfNodes = arrayOfNodeTypes.map(engine.getNodeType)
  engine.onUpdate(delta => handler.update(...arrayOfNodes, delta, engine))
  handler.init(...arrayOfNodes)
}

export const createSystem = baseCreateSystem(makeSystem)
export const createEnhancedSystem = baseCreateSystem(makeEnhancedSystem)

export const system = (name, handler) => (...arrayOfNodeTypes) => {
  if (!handler) {
    // support handler as first param
    handler = name
  }

  const nodeTypesAmount = arrayOfNodeTypes.length
  if (nodeTypesAmount === 0) {
    throw new Error('You must provide at least one nodeType to \'system\' factory')
  }

  return nodeTypesAmount === 1
    ? createSystem(handler)(arrayOfNodeTypes[0])
    : createEnhancedSystem(handler)(...arrayOfNodeTypes)
}
