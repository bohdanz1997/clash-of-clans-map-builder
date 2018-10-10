import { createComponent } from '../core/factories'
import { GameField } from '../core/tools'

export const [cUnit, Unit] = createComponent('unit')
export const [cSpell, Spell] = createComponent('spell')

export const [cBuilding, Building] = createComponent('building')
export const [cDefenceBuilding, DefenceBuilding] = createComponent('defence building')
export const [cServiceBuilding, ServiceBuilding] = createComponent('service building')
export const [cResourceBuilding, ResourceBuilding] = createComponent('resource building')
export const [cWall, Wall] = createComponent('wall')

export const [cArcher, Archer] = createComponent('archer')

export const [cInteract, Interact] = createComponent('interact')

export const [cPlayer, Player] = createComponent('player')
export const [cEnemy, Enemy] = createComponent('enemy')
export const [cGround, Ground] = createComponent('ground')

export const [cMap, Map] = createComponent(
  'map', 'gameField',
  ({ width, height, layers }) => ({
    gameField: new GameField(width, height, layers),
  })
)
