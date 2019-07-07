import { HookProvider } from './HookProvider'
import { setCurrentProvider } from './current-provider'
import { eachHooks, throwIfMoreOneNodeType, throwErrorForProvider } from './utils'

/**
 * @param {Engine} engine
 * @param {AwilixContainer} container
 * @param {Function} setup
 */
export const initHookProvider = (engine, container, setup) => {
  const provider = new HookProvider(setup.name, setup)

  const getNodeTypes = hookNodes => hookNodes.map(getNodeType)

  const getNodeType = (hookNode) => {
    if (!nodeTypesMap.has(hookNode)) {
      throwErrorForProvider(`could not found nodeType for node: ${hookNode}`)
    }
    return nodeTypesMap.get(hookNode)
  }

  setCurrentProvider(provider)
  container.build(provider.setup)

  if (provider.hooksCount > 0) {
    if (!provider.useNodesHook) {
      throwErrorForProvider('should call "useNodes" hook, to use other hooks')
    }
    provider.useNodesHook.handler()
  }

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
    throwIfMoreOneNodeType('onNodeAdded', hook)
    const nodeType = getNodeType(hook.nodes[0])
    nodeType.each(hook.handler)
    nodeType.onAdded(hook.handler)
  }, provider.onAddedHooks)

  eachHooks((hook) => {
    throwIfMoreOneNodeType('onNodeRemoved', hook)
    const nodeType = getNodeType(hook.nodes[0])
    nodeType.onRemoved(hook.handler)
  }, provider.onRemovedHooks)
}
