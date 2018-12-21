import StateMachine from 'javascript-state-machine'
import { expolorer } from 'assets/atlas/treasureHunter'

import {
  pipeHOCs,
  withComponents,
} from '../components/hoc'
import { withDisplay } from '../services'
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

  return entity.add(c.FSM.of({ fsm }))
}

export default ({ x, y, width, height, speed, health, damage }) => (
  pipeHOCs(
    withComponents(
      c.Player.of(),
      c.Position.of({ x, y }),
      c.Motion.of(),
      c.Collision.of({ width, height }),
      c.MotionControl.of({ dx: speed, dy: speed }),
      c.Damage.of({ damage }),
      c.Health.of({ health }),
    ),
    withFSM,
    withDisplay.sprite({ asset: expolorer }),
  )
)
