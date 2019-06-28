import { Hook } from './Hook'
import { getCurrentProvider } from './current-provider'
import { createWrappedHook } from './utils'

export const useNodes = (nodes) => {
  getCurrentProvider().useNodesHook = new Hook(() => {
    getCurrentProvider().nodes = nodes
  }, [])
}

/**
 * @param {Function} handler
 * @param {*} node
 */
export const onNodeAdded = (handler, node = null) => {
  getCurrentProvider().onAddedHooks.push(createWrappedHook(handler, [node]))
}

/**
 * @param {Function} handler
 * @param {*} node
 */
export const onNodeRemoved = (handler, node = null) => {
  getCurrentProvider().onRemovedHooks.push(createWrappedHook(handler, [node]))
}

/**
 * @param {Function} handler
 * @param {*} node
 */
export const nodeEach = (handler, node = null) => {
  getCurrentProvider().nodeEachHooks.push(createWrappedHook(handler, [node]))
}

/**
 * @param {Function} handler
 */
export const onUpdate = (handler) => {
  getCurrentProvider().onUpdateHooks.push(createWrappedHook(handler, []))
}
