import { Keyboard, PointerManager } from 'core/input'
import { createStage } from 'core/render-layers'
import { createContainer, asValue, AwilixContainer } from 'awilix'
import { EventEmitter, Loader, Application } from 'core/pixi'
import { SystemManager, EntityManager, Engine } from 'core/scent'
import { Align } from 'core/display'

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
    width,
    height,
  } = config

  const app = new Application({
    antialias,
    resolution,
    transparent,
    width,
    height,
  })

  app.stage = createStage(config.displayGroups)
  app.stage.addChild(...config.display.containers)

  return app
}

export default class Game {
  constructor(config, callbacks) {
    this.config = new Config({ ...config, callbacks })

    this.events = new EventEmitter()

    this.keyboard = new Keyboard(this.config.inputKeyboardEventTarget)

    this.pointers = new PointerManager(this)

    /** @type {Application} */
    this.app = configurePixiApp(this.config)

    /** @type {Engine} */
    this.engine = new Engine()

    this.textures = new TextureManager()

    this.loader = new Loader(this.config.baseAssetsUrl)

    this.cache = new Cache(this.loader)

    this.scenes = new SceneManager(this)

    this.entities = new EntityManager(this)

    const bounds = this.app.screen
    this.align = new Align(bounds.x, bounds.y, bounds.width, bounds.height)

    /** @type {AwilixContainer} */
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
      pointers: asValue(this.pointers),
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
