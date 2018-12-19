import { Group } from 'core/pixi'
import { spriteUtils } from 'core/display'
import { sortingStrategy } from 'core/renderLayers'

export default {
  groups: {
    GROUND: new Group(0, false),
    OVERLAY: new Group(2, true),
    SHADOW: new Group(3, false),
    BUILDING: new Group(5, sortingStrategy.forward),
    DRAG: new Group(10, false),
    HUD: new Group(20, false),
  },

  containers: [
    spriteUtils.group('world'),
    spriteUtils.group('hud'),
  ],
}
