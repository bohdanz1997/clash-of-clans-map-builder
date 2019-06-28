export class HookProvider {
  constructor(name, setup) {
    /** @type {string} */
    this.name = name

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
