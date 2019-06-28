/** @type {HookProvider} */
let currentProvider = null

export const getCurrentProvider = () => currentProvider

export const setCurrentProvider = (provider) => {
  currentProvider = provider
}
