/* eslint-disable class-methods-use-this */
import {
  Game,
  Cache,
  Engine,
  Loader,
  Config,
  Application,
  SystemManager,
} from 'core'
import { AwilixContainer } from 'awilix'

import { isString } from '../util'

export default class Scene {
  name = ''

  /** @type {Game} */
  game = null

  /** @type {AwilixContainer} */
  container = null

  /** @type {Config} */
  config = null

  /** @type {Engine} */
  engine = null

  /** @type {Application} */
  app = null

  /** @type {Cache} */
  cache = null

  /** @type {Loader} */
  loader = null

  /** @type {SystemManager} */
  systems = null

  constructor(config) {
    if (isString(config)) {
      this.name = config
    } else {
      this.name = config.name
    }
  }

  preload() {}

  create() {}

  update(delta) {}

  destroy() {}
}
