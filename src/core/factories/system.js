import { noop, isFunction } from '../util'

const defaultHandler = {
  init: noop,
  before: noop,
  after: noop,
  update: noop,
}

const baseCreateSystem = systemFactory => (handler) => {
  if (isFunction(handler)) {
    const singleUpdateHandler = { ...defaultHandler, update: handler }
    return systemFactory(singleUpdateHandler)
  }

  const systemHandler = { ...defaultHandler, ...handler }
  return systemFactory(systemHandler)
}

const makeSystem = handler => (componentTypes) => engine => {
  const node = engine.getNodeType(componentTypes)
  engine.onUpdate(delta => {
    handler.before(delta)
    node.each(item => handler.update(item, delta))
    handler.after(delta)
  })
  handler.init(node)
}

const makeEnhancedSystem = handler => (...componentTypesList) => engine => {
  const nodes = componentTypesList.map(engine.getNodeType)
  engine.onUpdate(delta => handler.update(...nodes, delta, engine))
  handler.init()
}

export const createSystem = baseCreateSystem(makeSystem)
export const createEnhancedSystem = baseCreateSystem(makeEnhancedSystem)
