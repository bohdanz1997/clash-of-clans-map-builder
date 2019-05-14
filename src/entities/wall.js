import { pipeHOCs, withComponents } from 'app/components/hoc'
import { withDisplay } from 'app/services'
import * as c from '../components'

export default ({
  data: { id, x, y, radius },
  map,
}) => pipeHOCs(
  withComponents(
    c.BuildingLayer(),
    c.Interactive(),
    c.Draggable(),
    c.Position({ x, y }),
    c.IsoPosition(),
    c.Collision({ width: map.config.cellWidth, height: map.config.cellHeight, radius }),
  ),
  withDisplay.sprite({ asset: id }),
)
