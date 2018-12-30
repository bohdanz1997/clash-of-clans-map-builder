import { Game } from 'core'

import {
  GameScene,
  SandboxScene,
} from './scenes'
import { display } from './config'
import { createStats } from './services'
import { priorities } from './constants'

const stats = createStats()

const game = new Game({
  width: 600,
  height: 600,
  scene: [GameScene],
  system: {
    defaultPriority: priorities.UPDATE,
  },
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
