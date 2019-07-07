import { component } from 'core/ecs'

class DamageRaw {
  damage = 0

  constructor({ damage }) {
    this.damage = damage
  }
}

/** @type {DamageRaw} */
export const Damage = component('damage', DamageRaw)
