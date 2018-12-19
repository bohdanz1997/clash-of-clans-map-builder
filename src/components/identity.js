import { createComponent } from 'core/scent'
import { uuid } from '../../core/util'

export const [cUnit, Unit] = createComponent('unit')
export const [cSpell, Spell] = createComponent('spell')

export const [cBuilding, Building] = createComponent('building')
export const [cDefenceBuilding, DefenceBuilding] = createComponent('defence building')
export const [cServiceBuilding, ServiceBuilding] = createComponent('service building')
export const [cResourceBuilding, ResourceBuilding] = createComponent('resource building')
export const [cWall, Wall] = createComponent('wall')
export const [cOverlayOwner, OverlayOwner] = createComponent('overlayOwner')
export const [cDeckItem, DeckItem] = createComponent('deckItem')
export const [cEntityMeta, EntityMeta] = createComponent(
  'entityMeta', 'id level count',
  ({ id, level = 1, count = 1 }) => ({ id, level, count }),
)

export const [cKeyboard, Keyboard] = createComponent('keyboard')
export const [cPlayer, Player] = createComponent('player')
export const [cEnemy, Enemy] = createComponent('enemy')

// layers
export const [cGroundLayer, GroundLayer] = createComponent('ground layer')
export const [cBackGroundLayer, BackGroundLayer] = createComponent('background layer')
export const [cBuildingLayer, BuildingLayer] = createComponent('game object layer')
export const [cDragLayer, DragLayer] = createComponent('drag layer')
export const [cHudLayer, HudLayer] = createComponent('hud layer')

export const [cIdentity, Identity] = createComponent(
  'identity', 'id seed',
  ({ id = null } = {}) => ({ seed: uuid(), id }),
)
