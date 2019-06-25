import { component } from 'core/scent'
import { Point } from 'pixi.js'

class InteractData {
  constructor({ entity }) {
    this.entity = entity
  }
}

export const Interact = {
  Initiator: component('initiator', InteractData),
  Target: component('target', InteractData),
}

class RelationData {
  constructor({ entity, offset = Point.EMPTY }) {
    this.entity = entity
    this.offset = offset
  }
}

export const Relation = {
  Parent: component('parent', RelationData),
  Child: component('child', RelationData),
}

// states
export const Idle = component('idle')
export const Hovered = component('hovered')
export const Clicked = component('clicked')
export const Dragging = component('dragging')
export const Selected = component('selected')
export const Dropped = component('dropped')

// features
export const Interactive = component('interactive')
export const Selectable = component('selectable')
