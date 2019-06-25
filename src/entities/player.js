import { expolorer } from 'assets/atlas/treasureHunter'
import { createEntity } from 'core/scent'
import { DisplayFactory } from 'core/display'

import * as c from '../components'

export const Player = ({
  data: { x, y, width, height, speed, health, damage },
}) => createEntity(
  c.Player(),
  c.Position({ x, y }),
  c.Motion(),
  c.Collision({ width, height }),
  c.MotionControl({ dx: speed, dy: speed }),
  c.Damage({ damage }),
  c.Health({ health }),
  c.Display(DisplayFactory.sprite(expolorer)),
)
