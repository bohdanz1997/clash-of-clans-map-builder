/* eslint-disable class-methods-use-this */
import { Game, Cache, Config } from 'core/boot'
import { Engine, SystemManager, EntityManager } from 'core/ecs'
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

  /** @type {Engine|null} */
  engine = null

  /** @type {PIXI.Renderer} */
  renderer = null

  /** @type {PIXI.display.Stage} */
  stage = null

  /** @type {Cache} */
  cache = null

  /** @type {PIXI.Loader} */
  loader = null

  /** @type {SystemManager} */
  systems = null

  /** @type {EntityManager} */
  entities = null

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
