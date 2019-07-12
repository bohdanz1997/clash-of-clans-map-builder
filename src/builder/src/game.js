import { Game } from 'core/boot'
import { asValue } from 'awilix'

import { GameScene } from './scenes'
import { display } from './config'
import { priorities } from './constants'

export const createGame = ({ layout }) => {
  const parentEl = document.getElementById('pixi')
  const game = new Game({
    width: 1100,
    height: window.innerHeight - 100,
    debug: true,
    logger: {
      enable: true,
      timestamp: false,
      levels: {
        interact: false,
        relation: true,
        layout: true,
      },
    },
    parent: parentEl,
    scene: [GameScene],
    system: {
      defaultPriority: priorities.UPDATE,
    },
    display: {
      groups: display.groups,
      containers: display.createContainers(),
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

  return game
}
