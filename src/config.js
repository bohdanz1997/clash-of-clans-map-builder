import { Group } from 'core/pixi'
import { sortingStrategy } from 'core'
import { spriteUtils } from 'core/display'

class DisplayGroups {
  GROUND = new Group(0, false)
  OVERLAY = new Group(2, true)
  SHADOW = new Group(3, false)
  BUILDING = new Group(5, sortingStrategy.forward)
  HUD = new Group(10, false)
  DRAG = new Group(20, false)
}

export const display = {
  groups: new DisplayGroups(),

  containers: [
    spriteUtils.group('world'),
    spriteUtils.group('hud'),
  ],
}
