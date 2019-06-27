import { component } from 'core/ecs'
import { display } from '../config'

const { groups } = display

const layerComponent = (name, group) => (
  component(name, 'group', () => ({ group }))
)

export const Layer = {
  Ground: layerComponent('layer', groups.GROUND),
  BackGround: layerComponent('layer', groups.OVERLAY),
  Building: layerComponent('layer', groups.BUILDING),
  Hud: layerComponent('layer', groups.HUD),
  Drag: layerComponent('layer', groups.DRAG),
  Debug: layerComponent('layer', groups.DEBUG),
}
