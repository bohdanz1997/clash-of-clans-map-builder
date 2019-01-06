import { defComponent } from 'core/scent'

export const Interactive = defComponent(
  'interactive'
)

export const Interact = {
  Client: defComponent('client', 'entity'),
  Source: defComponent('source', 'entity'),
}

// states
const IdleState = defComponent('idleState')
const HoverState = defComponent('hoverState')
const ClickState = defComponent('clickState')
const DragState = defComponent('dragState')
const DropState = defComponent('dropState')

// ables
const Interactable = defComponent('interactable')
const Draggable = defComponent('draggable')
