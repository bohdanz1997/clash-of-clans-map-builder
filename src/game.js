import { Game } from 'core'

import { display } from './config'
import { GameScene } from './scenes'
import { createStats } from './services'

(() => {
  const stats = createStats()

  const game = new Game({
    scene: [GameScene],
    display: {
      groups: display.groups,
      containers: display.containers,
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
