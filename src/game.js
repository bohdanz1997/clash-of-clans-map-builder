import { Game, Stats } from 'core'

import {
  GameScene,
  SandboxScene,
} from './scenes'
import { display } from './config'
import { priorities } from './constants'

export const createGame = () => {
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

  const stats = new Stats([
    [0, 0, Stats.types.FPS],
    [0, 48, Stats.types.MB],
  ])

  game.events
    .on('preUpdate', stats.begin)
    .on('postUpdate', stats.end)
}
