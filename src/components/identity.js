import { createComponent } from 'core/factories'

export const [cUnit, Unit] = createComponent('unit')
export const [cSpell, Spell] = createComponent('spell')

export const [cBuilding, Building] = createComponent('building')
export const [cDefenceBuilding, DefenceBuilding] = createComponent('defence building')
export const [cServiceBuilding, ServiceBuilding] = createComponent('service building')
export const [cResourceBuilding, ResourceBuilding] = createComponent('resource building')
export const [cWall, Wall] = createComponent('wall')
export const [cBackGround, BackGround] = createComponent('background')

export const [cInput, Input] = createComponent('input')
export const [cPlayer, Player] = createComponent('player')
export const [cEnemy, Enemy] = createComponent('enemy')

// layers
export const [cGroundLayer, GroundLayer] = createComponent('ground layer')
export const [cBackGroundLayer, BackGroundLayer] = createComponent('background layer')
export const [cBuildingLayer, BuildingLayer] = createComponent('game object layer')
export const [cDragLayer, DragLayer] = createComponent('drag layer')
export const [cHudLayer, HudLayer] = createComponent('hud layer')

let idx = 0

export const [cIdentity, Identity] = createComponent(
  'identity', 'id type',
  () => ({ id: idx++, type: null }),
)
