import { component } from 'core/ecs'
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

const childComponent = () => component('child', ChildData)

export const Parent = component('parent', ParentData)

export const Child = {
  Default: childComponent(),
  Overlay: childComponent(),
  Preview: childComponent(),
  Debug: childComponent(),
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
