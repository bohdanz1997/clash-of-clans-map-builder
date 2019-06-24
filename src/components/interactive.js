import { defComponent } from 'core/scent'

export const Interact = {
  Initiator: defComponent('initiator', 'entity'),
  Target: defComponent('target', 'entity'),
}

export const Relation = {
  Parent: defComponent('parent', 'entity', entity => ({ entity })),
  Child: defComponent('child', 'entity', entity => ({ entity })),
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
