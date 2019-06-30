import { Point } from 'pixi.js'
import { createEntity } from 'core/ecs'
import { View } from 'core/display'
import * as e from '.'
import * as c from '../components'

export const Button = ({
  data: { x, y, width, height, color },
  entities,
  view,
}) => createEntity(
  c.Layer.UI(),
  c.UI(),
  // c.Child.DebugUI({
  //   entity: entities.create(e.Debug),
  //   offset: new Point(-width - 10, 0),
  // }),
  c.Draggable(),
  c.Position({ x, y }),
  c.Collision({ width, height }),
  ({ entity }) => c.FSM(entity),
  c.Display(view.rect({
    width,
    height,
    color,
  }))
)
