import { Keyboard } from 'core/input'
import { createStage } from 'core/renderLayers'
import { createContainer, asValue } from 'awilix'
import { EventEmitter, Loader, Application } from 'core/pixi'
import { SystemManager, EntityManager, Engine } from 'core/scent'

import { Config, Cache } from '.'
import TextureManager from './TextureManager'
import { SceneManager, sceneCreator } from '../scenes'

const addToDOM = (app, domTarget) => {
  domTarget.appendChild(app.view)
}

/**
 * @param {Config} config
 */
const configurePixiApp = (config) => {
  const {
    antialias,
    resolution,
    transparent,
  } = config

  const app = new Application({
    antialias,
    resolution,
    transparent,
  })

  app.stage = createStage(config.display.groups)
  app.stage.addChild(...config.display.containers)

  return app
}

export default class Game {
  constructor(config, callbacks) {
    this.config = new Config({ ...config, callbacks })

    this.events = new EventEmitter()

    this.keyboard = new Keyboard(this.config.inputKeyboardEventTarget)

    this.app = configurePixiApp(this.config)

    /** @type {Engine} */
    this.engine = new Engine()

    this.textures = new TextureManager()

    this.loader = new Loader(this.config.baseAssetsUrl)

    this.cache = new Cache(this.loader)

    this.scenes = new SceneManager(this)

    this.entities = new EntityManager()

    this.container = createContainer()

    this.container.register({
      app: asValue(this.app),
      events: asValue(this.app),
      cache: asValue(this.cache),
      engine: asValue(this.engine),
      config: asValue(this.config),
      loader: asValue(this.loader),
      textures: asValue(this.textures),
      keyboard: asValue(this.keyboard),
      entities: asValue(this.entities),
    })

    this.systems = new SystemManager(this)

    this.container.register({
      systems: asValue(this.systems),
    })

    this.isRunning = false

    this.boot()
  }

  boot() {
    this.config.preBoot(this)

    addToDOM(this.app, this.config.parent)

    this.create()

    this.events.emit('boot')

    this.loader.load(this.start)
  }

  create() {
    sceneCreator(this.scenes, this.config.sceneConfig)
  }

  start = () => {
    this.isRunning = true

    this.events.emit('start')
    this.engine.start()

    this.config.postBoot(this)

    this.app.ticker.add(this.update)
  }

  update = (delta) => {
    this.events.emit('preUpdate')

    this.engine.update(delta)
    this.scenes.update(delta)

    this.events.emit('postUpdate')
  }

  destroy() {
    this.app.destroy()
    this.scenes.destroy()
    this.engine = null
  }
}
