import { defComponent } from 'core/scent'

export const Interact = {
  Initiator: defComponent('initiator', 'entity'),
  Target: defComponent('target', 'entity'),
}

// states
export const Idle = defComponent('idle')
export const Hovered = defComponent('hovered')
export const Clicked = defComponent('clicked')
export const Dragging = defComponent('dragging')
export const Dropped = defComponent('dropped')

// features
export const Interactive = defComponent('interactive')
