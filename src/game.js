import { Game } from 'core'

import { GameScene } from './scenes'
import { viewConfig } from './config'
import { createStats } from './services'

(() => {
  const stats = createStats()

  const game = new Game({
    scene: [GameScene],
    display: {
      groups: viewConfig.groups,
      containers: viewConfig.containers,
    },
  })

  game.events
    .on('preUpdate', () => {
      stats.begin()
    })
    .on('postUpdate', () => {
      stats.end()
    })

})()
