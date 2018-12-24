import {
  createContainer,
  asValue,
} from 'awilix'
import { Engine } from 'scent2'
import { Application, loader } from 'pixi.js'
import { EventEmitter } from 'core/pixi'
import { Keyboard } from 'core/input'
import { createStage } from 'core/renderLayers'

import Config from './Config'
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

    this.engine = new Engine()

    this.textures = new TextureManager()

    this.loader = loader

    this.container = createContainer()

    this.container.register({
      app: asValue(this.app),
      events: asValue(this.app),
      engine: asValue(this.engine),
      config: asValue(this.config),
      loader: asValue(this.loader),
      textures: asValue(this.textures),
      keyboard: asValue(this.keyboard),
    })

    this.scenes = new SceneManager(this.config, this.container)

    this.isRunning = false

    this.events.emit('boot')
    this.boot()
  }

  boot() {
    this.config.preBoot(this)

    addToDOM(this.app, this.config.parent)

    // TODO: move to scene
    this.config.preload(this)

    this.loader.load(this.start)
  }

  start = () => {
    this.isRunning = true

    this.create()

    this.config.postBoot(this)

    this.app.ticker.add(this.update)
  }

  create() {
    sceneCreator(this.scenes, this.config.sceneConfig, this.container)
  }

  update = (delta) => {
    this.events.emit('preUpdate')

    this.scenes.update(delta)

    this.events.emit('postUpdate')
  }

  destroy() {
    this.app.destroy()
    this.scenes.destroy()
  }
}
