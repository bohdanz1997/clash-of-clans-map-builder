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

class ChildData {
  constructor(params) {
    this.entity = params.entity || params
    this.offset = params.offset || Point.EMPTY
  }
}

class ParentData {
  constructor(params) {
    this.entity = params.entity || params
    this.offset = params.offset || Point.EMPTY
    this.childType = params.childType
  }
}

export const Parent = component('parent', ParentData)

export const Child = {
  Default: component('child', ChildData),
  Overlay: component('child', ChildData),
  Preview: component('child', ChildData),
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
