import { Game } from 'core/boot'
import { Stats } from 'core/stats'

import { asValue } from 'awilix'
import { GameScene } from './scenes'
import { display } from './config'
import { priorities } from './constants'

export const createGame = ({ layout }) => {
  const game = new Game({
    width: 1100,
    height: 960,
    debug: true,
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

  const onBoot = () => {
    game.container.register({
      layout: asValue(layout),
    })
  }

  game.events
    .on('preUpdate', stats.begin)
    .on('postUpdate', stats.end)
    .on('boot', onBoot)

  game.boot()
}
