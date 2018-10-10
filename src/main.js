// @flow
import type { GameConfig } from './types/game'

import createEngine from './engine'
import { createStats } from './services'

import {
  loader,
  Application,
} from './core/pixi'

import * as atlas from './assets/atlas/treasureHunter'
import ground from './assets/image/ground.png'

const target: ?HTMLBodyElement = document.body

const setup = () => {
  const width = 800
  const height = 600
  const tileWidth = 133
  const tileHeight = 100

  const appSize = {
    width,
    height,
    hWidth: width / 2,
    hHeight: height / 2,
  }

  const pixiConfig = {
    antialias: true,
    transparent: false,
    resolution: 1,
    ...appSize,
  }

  if (!target) {
    console.error('Could not find target element')
    return
  }

  const appConfig: GameConfig = {
    ...appSize,
    target,
    tileWidth,
    tileHeight,
    hTileWidth: tileWidth / 2,
    hTileHeight: tileHeight / 2,
    widthInTiles: 6,
    heightInTiles: 6,
  }

  const app = new Application(pixiConfig)

  target.appendChild(app.view)

  const stats = createStats()
  const engine = createEngine(appConfig, app)
  engine.start()

  app.ticker.add((delta) => {
    stats.begin()
    engine.update(delta)
    stats.end()
  })
}

loader
  .add(atlas.file)
  .add('ground', ground)
  .load(setup)
