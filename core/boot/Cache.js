import { Loader } from '../pixi'

export default class Cache {
  /**
   * @param {Loader} loader
   */
  constructor(loader) {
    this.loader = loader
  }

  get(id) {
    return this.getResource(id).data
  }

  getResource(id) {
    const resource = this.loader.resources[id]

    if (!resource) {
      throw new Error(`Cache: Could not find resource '${id}'`)
    }

    return resource
  }
}
