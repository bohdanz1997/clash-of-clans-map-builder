class InstanceProvider {
  constructor(nodes, setup) {
    /** @type {Array} */
    this.nodes = nodes

    /** @type {Function} */
    this.setup = setup

    /** @type {Hook[]} */
    this.onUpdateHooks = []

    /** @type {Hook[]} */
    this.onAddedHooks = []

    /** @type {Hook[]} */
    this.onRemovedHooks = []
  }
}

class Hook {
  constructor(handler, nodes) {
    /** @type {Function} */
    this.handler = handler

    /** @type {Array} */
    this.nodes = nodes
  }
}

/** @type {InstanceProvider} */
let currentProvider = null

const createHook = (handler, nodes) => {
  if (nodes.length === 0 || (nodes.length === 1 && nodes[0] === null)) {
    nodes = currentProvider.nodes
  }
  // TODO: check if currentProvider.nodes has all nodes param
  return new Hook(handler, nodes)
}

const required = (value, message) => {
  if (value === null || value === undefined) {
    throw new Error(message)
  }
}

/**
 * @param {Function} setup
 * @param {Array} nodes
 */
export const system = (setup, nodes) => new InstanceProvider(nodes, setup)

/**
 * @param {Function} handler
 * @param {*} node
 */
export const onNodeAdded = (handler, node = null) => {
  required(handler, 'Missing "handler" param')
  currentProvider.onAddedHooks.push(createHook(handler, [node]))
}

/**
 * @param {Function} handler
 * @param {*} node
 */
export const onNodeRemoved = (handler, node = null) => {
  required(handler, 'Missing "handler" param')
  currentProvider.onRemovedHooks.push(createHook(handler, [node]))
}

/**
 * @param {Function} handler
 */
export const onUpdate = (handler) => {
  required(handler, 'Missing "handler" param')
  currentProvider.onUpdateHooks.push(createHook(handler, []))
}

/**
 * @param {Engine} engine
 * @param {AwilixContainer} container
 * @param {InstanceProvider} provider
 */
export const initProvider = (engine, container, provider) => {
  const nodeTypesMap = new Map()
  provider.nodes.forEach((node) => {
    nodeTypesMap.set(node, engine.getNodeType(node))
  })

  currentProvider = provider
  container.build(currentProvider.setup)

  const getNodeTypes = hookNodes => hookNodes.map(getNodeType)

  const getNodeType = (hookNode) => {
    if (!nodeTypesMap.has(hookNode)) {
      throw new Error(`Could not found nodeType for node: ${hookNode}`)
    }
    return nodeTypesMap.get(hookNode)
  }

  const throwIfMoreOneNodeType = (hookName, hook) => {
    if (hook.nodes.length > 1) {
      throw new Error(`"${hookName}" hook should accept only one nodeType`)
    }
  }

  provider.onUpdateHooks.forEach((hook) => {
    const nodeTypes = getNodeTypes(hook.nodes)

    if (nodeTypes.length > 1) {
      engine.onUpdate((delta) => {
        hook.handler(...nodeTypes, delta)
      })
    } else {
      engine.onUpdate((delta) => {
        nodeTypes[0].each(node => hook.handler(node, delta))
      })
    }
  })

  provider.onAddedHooks.forEach((hook) => {
    throwIfMoreOneNodeType('onAdded', hook)
    const nodeType = getNodeType(hook.nodes[0])
    nodeType.each(hook.handler)
    nodeType.onAdded(hook.handler)
  })

  provider.onRemovedHooks.forEach((hook) => {
    throwIfMoreOneNodeType('onRemoved', hook)
    const nodeType = getNodeType(hook.nodes[0])
    nodeType.onRemoved(hook.handler)
  })
}
