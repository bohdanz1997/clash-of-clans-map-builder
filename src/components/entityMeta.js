import { defComponent } from 'core/scent'

class EntityMetaData {
  constructor({ id, def = null, level = 1, count = 1 }) {
    this.id = id
    this.def = def
    this.level = level
    this.count = count
  }
}

export const EntityMeta = defComponent('entityMeta', EntityMetaData)
