import { defComponent } from 'core/scent'
import { Point } from 'core/pixi'

class InteractData {
  constructor({ entity }) {
    this.entity = entity
  }
}

export const Interact = {
  Initiator: defComponent('initiator', InteractData),
  Target: defComponent('target', InteractData),
}

class RelationData {
  constructor({ entity, offset = Point.EMPTY }) {
    this.entity = entity
    this.offset = offset
  }
}

export const Relation = {
  Parent: defComponent('parent', RelationData),
  Child: defComponent('child', RelationData),
}

// states
export const Idle = defComponent('idle')
export const Hovered = defComponent('hovered')
export const Clicked = defComponent('clicked')
export const Dragging = defComponent('dragging')
export const Selected = defComponent('selected')
export const Dropped = defComponent('dropped')

// features
export const Interactive = defComponent('interactive')
export const Selectable = defComponent('selectable')
