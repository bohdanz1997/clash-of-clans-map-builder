import { noop } from '../util'

const defaultHandler = {
  nodes: [],
  init: noop,
  before: noop,
  after: noop,
  update: noop,
}

const baseCreateSystem = systemFactory => (handler) => {
  const systemHandler = {
    ...defaultHandler,
    ...handler,
  }
  return systemFactory(systemHandler)
}

const makeSystem = handler => (engine) => {
  const nodes = engine.getNodeType(handler.nodes[0])
  engine.onUpdate((delta) => {
    handler.before(delta)
    nodes.each(node => handler.update(node, delta))
    handler.after(delta)
  })
  handler.init(nodes)
}

const makeEnhancedSystem = handler => (engine) => {
  const arrayOfNodes = handler.nodes.map(engine.getNodeType)
  engine.onUpdate(delta => handler.update(...arrayOfNodes, delta, engine))
  handler.init(...arrayOfNodes)
}

export const createSystem = engine => (handler) => {
  const sysHandler = {
    ...defaultHandler,
    ...handler,
  }

  const nodeTypesAmount = sysHandler.nodes.length
  if (nodeTypesAmount === 0) {
    throw new Error('You must provide at least one nodeType to \'system\' factory')
  }

  return nodeTypesAmount === 1
    ? baseCreateSystem(makeSystem)(sysHandler)(engine)
    : baseCreateSystem(makeEnhancedSystem)(sysHandler)(engine)
}
