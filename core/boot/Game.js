import { Keyboard, PointerManager } from 'core/input'
import { createContainer, asValue, AwilixContainer, asClass } from 'awilix'
import { Loader, Ticker, utils } from 'pixi.js'
import { SystemManager, EntityManager, Engine } from 'core/scent'
import { DisplayFactory } from 'core/display'
import { SceneManager, sceneCreator } from 'core/scenes'

import { Config } from './Config'
import { Cache } from './Cache'
import { TextureManager } from './TextureManager'
import { createRenderer, createStage } from './pixi-integration'

export class Game {
  constructor(config, callbacks) {
    this.config = new Config({ ...config, callbacks })

    this.events = new utils.EventEmitter()

    this.keyboard = new Keyboard(this.config.inputKeyboardEventTarget)

    this.pointers = new PointerManager(this)

    this.stage = createStage(this.config)

    utils.skipHello()
    this.renderer = createRenderer(this.config)

    this.ticker = new Ticker()

    /** @type {Engine} */
    this.engine = new Engine()

    this.textures = new TextureManager()

    this.loader = new Loader(this.config.baseAssetsUrl)

    this.cache = new Cache(this.loader)

    this.scenes = new SceneManager(this)

    this.entities = new EntityManager(this)

    // INFO: unused for now
    // const bounds = this.renderer.screen
    // this.align = new Align(bounds.x, bounds.y, bounds.width, bounds.height)

    /** @type {AwilixContainer} */
    this.container = createContainer()

    this.container.register({
      renderer: asValue(this.renderer),
      stage: asValue(this.stage),
      events: asValue(this.events),
      cache: asValue(this.cache),
      engine: asValue(this.engine),
      config: asValue(this.config),
      loader: asValue(this.loader),
      textures: asValue(this.textures),
      keyboard: asValue(this.keyboard),
      entities: asValue(this.entities),
      pointers: asValue(this.pointers),
      displayFactory: asClass(DisplayFactory),
    })

    this.systems = new SystemManager(this)

    this.container.register({
      systems: asValue(this.systems),
    })

    this.isRunning = false
  }

  boot() {
    this.config.preBoot(this)

    this.config.parent.appendChild(this.renderer.view)

    this.create()

    this.events.emit('boot')

    this.loader.load(this.start)
  }

  create() {
    sceneCreator(this.scenes, this.config.sceneConfig)
    this.keyboard.start()
    this.pointers.start()
  }

  start = () => {
    this.isRunning = true

    this.events.emit('start')
    this.engine.start()

    this.config.postBoot(this)

    this.ticker.add(this.update)
    this.ticker.start()
  }

  update = (delta) => {
    this.events.emit('preUpdate')

    this.engine.update(delta)
    this.scenes.update(delta)
    this.renderer.render(this.stage)

    this.events.emit('postUpdate')
  }

  destroy() {
    this.stage.destroy()
    this.stage = null

    this.renderer.destroy()
    this.renderer = null

    this.scenes.destroy()

    this.pointers.destroy()
    this.keyboard.destroy()

    this.engine = null
  }
}
