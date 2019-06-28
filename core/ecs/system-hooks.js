class Hook {
  constructor(handler, nodes) {
    /** @type {Function} */
    this.handler = handler

    /** @type {Array} */
    this.nodes = nodes
  }
}

export class HookProvider {
  constructor(setup) {
    /** @type {Array} */
    this.nodes = []

    /** @type {Function} */
    this.setup = setup

    /** @type {Hook[]} */
    this.onUpdateHooks = []

    /** @type {Hook[]} */
    this.onAddedHooks = []

    /** @type {Hook[]} */
    this.onRemovedHooks = []

    /** @type {Hook[]} */
    this.nodeEachHooks = []

    /** @type {Hook} */
    this.useNodesHook = null
  }
}

/** @type {HookProvider} */
let currentProvider = null

const createWrappedHook = (handler, nodes) => () => {
  if (nodes.length === 0 || (nodes.length === 1 && nodes[0] === null)) {
    nodes = currentProvider.nodes
  }
  // TODO: check if currentProvider.nodes has all nodes param
  return new Hook(handler, nodes)
}

const throwIfMoreOneNodeType = (name, hook) => {
  if (hook.nodes.length > 1) {
    throw new Error(`"${name}" hook should accept only one nodeType`)
  }
}

/**
 * @param {function(Hook)} cb
 * @param {Hook[]} hooks
 */
const eachHooks = (cb, hooks) => {
  hooks.forEach((hook) => {
    // unwrap hook
    if (typeof hook === 'function') {
      hook = hook()
    }
    cb(hook)
  })
}

export const useNodes = (nodes) => {
  currentProvider.useNodesHook = new Hook(() => {
    currentProvider.nodes = nodes
  }, [])
}

/**
 * @param {Function} handler
 * @param {*} node
 */
export const onNodeAdded = (handler, node = null) => {
  currentProvider.onAddedHooks.push(createWrappedHook(handler, [node]))
}

/**
 * @param {Function} handler
 * @param {*} node
 */
export const onNodeRemoved = (handler, node = null) => {
  currentProvider.onRemovedHooks.push(createWrappedHook(handler, [node]))
}

/**
 * @param {Function} handler
 * @param {*} node
 */
export const nodeEach = (handler, node = null) => {
  currentProvider.nodeEachHooks.push(createWrappedHook(handler, [node]))
}

/**
 * @param {Function} handler
 */
export const onUpdate = (handler) => {
  currentProvider.onUpdateHooks.push(createWrappedHook(handler, []))
}

/**
 * @param {Engine} engine
 * @param {AwilixContainer} container
 * @param {Function} setup
 */
export const initHookProvider = (engine, container, setup) => {
  const getNodeTypes = hookNodes => hookNodes.map(getNodeType)

  const getNodeType = (hookNode) => {
    if (!nodeTypesMap.has(hookNode)) {
      throw new Error(`Could not found nodeType for node: ${hookNode}`)
    }
    return nodeTypesMap.get(hookNode)
  }

  const provider = new HookProvider(setup)
  currentProvider = provider
  container.build(currentProvider.setup)

  if (!provider.useNodesHook) {
    throw new Error('Should call "useNodes" hook')
  }
  provider.useNodesHook.handler()

  const nodeTypesMap = new Map()
  provider.nodes.forEach((node) => {
    nodeTypesMap.set(node, engine.getNodeType(node))
  })

  eachHooks((hook) => {
    const nodeTypes = getNodeTypes(hook.nodes)

    if (nodeTypes.length > 1) {
      engine.onUpdate((delta) => {
        hook.handler(...nodeTypes, delta)
      })
    } else {
      engine.onUpdate((delta) => {
        nodeTypes[0].each((node) => {
          hook.handler(node, delta)
        })
      })
    }
  }, provider.onUpdateHooks)

  eachHooks((hook) => {
    throwIfMoreOneNodeType('nodeEach', hook)
    const nodeType = getNodeType(hook.nodes[0])
    nodeType.each(hook.handler)
  }, provider.nodeEachHooks)

  eachHooks((hook) => {
    throwIfMoreOneNodeType('onAdded', hook)
    const nodeType = getNodeType(hook.nodes[0])
    nodeType.each(hook.handler)
    nodeType.onAdded(hook.handler)
  }, provider.onAddedHooks)

  eachHooks((hook) => {
    throwIfMoreOneNodeType('onRemoved', hook)
    const nodeType = getNodeType(hook.nodes[0])
    nodeType.onRemoved(hook.handler)
  }, provider.onRemovedHooks)
}
