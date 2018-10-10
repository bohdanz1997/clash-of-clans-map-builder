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

const makeSystem = handler => componentTypes => (engine) => {
  if (!handler.meta.enabled) return
  const node = engine.getNodeType(componentTypes)
  engine.onUpdate((delta) => {
    handler.before(delta)
    node.each(item => handler.update(item, delta))
    handler.after(delta)
  })
  handler.init(node)
}

const makeEnhancedSystem = handler => (...componentTypesList) => (engine) => {
  if (!handler.meta.enabled) return
  const nodes = componentTypesList.map(engine.getNodeType)
  engine.onUpdate(delta => handler.update(...nodes, delta, engine))
  handler.init(...nodes)
}

export const createSystem = baseCreateSystem(makeSystem)
export const createEnhancedSystem = baseCreateSystem(makeEnhancedSystem)
