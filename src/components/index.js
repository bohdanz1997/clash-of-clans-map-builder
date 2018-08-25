import { Point, Rectangle } from '../core/util'
import { createComponent } from '../core/factories'

export const [cPosition, Position] = createComponent('position', 'pos', ({ x, y }) => ({
  pos: new Point(x, y),
}))

export const [cMotion, Motion] = createComponent('motion', 'vel dir', ({ vx, vy }) => ({
  vel: new Point(vx, vy),
  dir: 0,
}))

export const [cControl, Control] = createComponent('control', 'acceleration')

export const [cDamage, Damage] = createComponent('damage', 'rate', ({ rate }) => ({ rate }))

export const [cHealth, Health] = createComponent('health', 'current max', ({ health }) => ({
  current: health,
  max: health,
}))

export const [cCollision, Collision] = createComponent('collision', 'bounds radius', ({ width, height, radius }) => {
  const bounds = new Rectangle(0, 0, width, height)
  return {
    bounds,
    radius,
    center: bounds.center,
  }
})

export const [cInfo, Info] = createComponent('info', 'type', ({ type }) => ({
  type,
}))

// identity
export const [cUnit, Unit] = createComponent('unit')
export const [cSpell, Spell] = createComponent('spell')

export const [cBuilding, Building] = createComponent('building')
export const [cDefenceBuilding, DefenceBuilding] = createComponent('defence building')
export const [cServiceBuilding, ServiceBuilding] = createComponent('service building')
export const [cResourceBuilding, ResourceBuilding] = createComponent('resource building')
export const [cWall, Wall] = createComponent('wall')

export const [cArcher, Archer] = createComponent('archer')

/*
entity
  unit
   dark
   elixir
  spell
   dark
   elixir
  building
    defence
    resource
    service
*/
