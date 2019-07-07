import { Group } from 'core/pixi'
import { sortingStrategy } from 'core/render-layers'
import { SpriteUtils } from 'core/display'

class DisplayGroups {
  GROUND = new Group(0, false)
  OVERLAY = new Group(2, true)
  SHADOW = new Group(3, false)
  BUILDING = new Group(5, sortingStrategy.backward)
  DRAG = new Group(10, false)
  HUD = new Group(11, false)
  UI = new Group(15, sortingStrategy.backward)
  UI_DRAG = new Group(20, false)
  DEBUG = new Group(25, false)
}

export const display = {
  groups: new DisplayGroups(),

  createContainers() {
    return [
      SpriteUtils.group('world'),
      SpriteUtils.group('hud'),
    ]
  }
}

export const levels = {
  interact: 'interact',
  relation: 'relation',
  layout: 'layout',
}
