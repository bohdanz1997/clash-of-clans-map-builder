import { defComponent } from 'core/scent'

class DamageRaw {
  damage = 0

  constructor({ damage }) {
    this.damage = damage
  }
}

/** @type {DamageRaw} */
export const Damage = defComponent('damage', DamageRaw)
