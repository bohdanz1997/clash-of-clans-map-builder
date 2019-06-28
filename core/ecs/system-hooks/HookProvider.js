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
