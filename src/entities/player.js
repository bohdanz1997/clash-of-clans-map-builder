import StateMachine from 'javascript-state-machine'
import { expolorer } from 'assets/atlas/treasureHunter'
import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'

import * as c from '../components'

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

export default ({
  data: { x, y, width, height, speed, health, damage },
}) => createEntity(
  c.Player(),
  c.Position({ x, y }),
  c.Motion(),
  c.Collision({ width, height }),
  c.MotionControl({ dx: speed, dy: speed }),
  c.Damage({ damage }),
  c.Health({ health }),
  c.Display(DisplayFactory.sprite({ asset: expolorer })),
)
