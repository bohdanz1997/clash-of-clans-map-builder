export class Hook {
  constructor(handler, nodes) {
    /** @type {Function} */
    this.handler = handler

    /** @type {Array} */
    this.nodes = nodes
  }
}
