import { Hook } from './Hook'
import { getCurrentProvider } from './current-provider'

export const createWrappedHook = (handler, nodes) => () => {
  if (nodes.length === 0 || (nodes.length === 1 && nodes[0] === null)) {
    nodes = getCurrentProvider().nodes
  }
  // TODO: check if currentProvider.nodes has all nodes param
  return new Hook(handler, nodes)
}

export const throwIfMoreOneNodeType = (name, hook) => {
  if (hook.nodes.length > 1) {
    throw new Error(`"${name}" hook should accept only one nodeType`)
  }
}

export const throwErrorForProvider = (message) => {
  throw new Error(`[${getCurrentProvider().name}] ${message}`)
}

/**
 * @param {function(Hook)} cb
 * @param {Hook[]} hooks
 */
export const eachHooks = (cb, hooks) => {
  hooks.forEach((hook) => {
    // unwrap hook
    if (typeof hook === 'function') {
      hook = hook()
    }
    cb(hook)
  })
}
