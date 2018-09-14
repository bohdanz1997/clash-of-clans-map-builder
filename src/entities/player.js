import StateMachine from 'javascript-state-machine'

import * as c from '../components'
import { createSprite } from '../core/pixi'
import { buildEntity, pipeEntity } from '../core/factories'
import { expolorer } from '../assets/atlas/treasureHunter'

const withFSM = (entity) => {
  const fsm = new StateMachine({
    init: 'idle',
    transitions: [
      { name: 'alerted', from: 'idle', to: 'alert' },
      { name: 'attacked', from: 'alert', to: 'attack' },
      { name: 'idled', from: 'attack', to: 'idle' },
    ],
  })

  return entity.add(c.FSM({ fsm }))
}

const withDisplay = (entity) => {
  const sprite = createSprite(expolorer)
  return entity.add(c.Display({ sprite }))
}

export default ({ x, y, width, height, speed, health, damage }) => (
  pipeEntity(
    buildEntity(
      c.Player(),
      c.Position({ x, y }),
      c.Motion(),
      c.Collision({ width, height }),
      c.Control({ dx: speed, dy: speed }),
      c.Damage({ rate: damage }),
      c.Health({ health }),
    ),
    withFSM,
    withDisplay,
  )
)
