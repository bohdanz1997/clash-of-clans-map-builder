import { defComponent } from 'core/scent'

class DisplayRaw {
  sprite
  group = null
  oldGroup = null

  constructor({ sprite }) {
    this.sprite = sprite
  }
}

/** @type {DisplayRaw} */
export const Display = defComponent('display', DisplayRaw)
