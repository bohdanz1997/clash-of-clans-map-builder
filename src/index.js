import createEngine from './engine'

import {
  loader,
  Application,
} from './core/pixi'

import * as atlas from './assets/atlas/treasureHunter'

const rootEl = document.body

const appSize = {
  width: 512,
  height: 512,
}

const pixiConfig = {
  antialias: true,
  transparent: false,
  resolution: 1,
  ...appSize,
}

const appConfig = {
  target: rootEl,
  ...appSize,
}

const app = new Application(pixiConfig)

rootEl.appendChild(app.view)

const setup = () => {
  const engine = createEngine(appConfig, app)
  engine.start()
  app.ticker.add(engine.update)
}

loader
  .add(atlas.file)
  .load(setup)
