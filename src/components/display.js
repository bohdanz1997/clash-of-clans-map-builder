import { defComponent } from 'core/scent'

class DisplayRaw {
  sprite
  parentId
  group = null
  oldGroup = null

  constructor({ sprite, parentId = 'world' }) {
    this.sprite = sprite
    this.parentId = parentId
  }
}

/** @type {DisplayRaw} */
export const Display = defComponent('display', DisplayRaw)
