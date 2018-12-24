/* eslint-disable class-methods-use-this */
import { isString } from '../util'

export default class Scene {
  constructor(config) {
    if (isString(config)) {
      this.name = config
    } else {
      this.name = config.name
    }
  }

  create() {}

  preload() {}

  update(delta) {}

  destroy() {}
}
