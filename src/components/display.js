import { component } from 'core/scent'

class DisplayRaw {
  constructor(sprite) {
    this.sprite = sprite
  }
}

/** @type {DisplayRaw} */
export const Display = component('display', DisplayRaw)
