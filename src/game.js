import { Game } from 'core'
import { asFunction } from 'awilix'

import Ignitor from './Ignitor'
import { GameScene } from './scenes'
import { createStats } from './services'
import { viewConfig } from './config'

const createIgnitor = () => (
  new Ignitor({
    paths: {
      base: 'src',
      assets: 'assets',
      systems: 'systems',
      entities: 'entities',
    },
    defaultSystemPriority: 0,
  })
)

/**
 * @param {Game} game
 */
const preBoot = (game) => {
  game.container.register({
    ignitor: asFunction(createIgnitor),
  })
}

/**
 * @param {Game} game
 */
const preload = (game) => {
  game.loader.onProgress.add((loader) => {
    console.log('loading progress %', loader.progress)
  })

  game.loader
    .add('ground', 'assets/image/ground.png')
    .add('clanCastle', 'assets/image/clanCastle.png')
    .add('goldStorage', 'assets/image/goldStorage.png')
    .add('elixirCollector', 'assets/image/elixirCollector.png')
}

(() => {
  const stats = createStats()

  const game = new Game({
    scene: [GameScene],
    display: {
      groups: viewConfig.groups,
      containers: viewConfig.containers,
    },
  }, {
    preBoot,
    preload,
  })

  game.events
    .on('preUpdate', () => {
      stats.begin()
    })
    .on('postUpdate', () => {
      stats.end()
    })

})()
