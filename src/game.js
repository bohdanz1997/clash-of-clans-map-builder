import { Game } from 'core/boot'
import { asValue } from 'awilix'

import { GameScene } from './scenes'
import { display } from './config'
import { priorities } from './constants'

export const createGame = ({ layout }) => {
  const game = new Game({
    width: 1100,
    height: 960,
    debug: true,
    logger: {
      enable: true,
      timestamp: false,
      levels: {
        interact: false,
        relation: true,
      },
    },
    scene: [GameScene],
    system: {
      defaultPriority: priorities.UPDATE,
    },
    display: {
      groups: display.groups,
      containers: display.containers,
    },
  })

  const onBoot = () => {
    game.container.register({
      layout: asValue(layout),
    })
  }

  game.events
    .on('boot', onBoot)

  game.boot()
}
