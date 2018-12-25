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
  })

  game.events
    .on('preUpdate', () => {
      stats.begin()
    })
    .on('postUpdate', () => {
      stats.end()
    })

})()
