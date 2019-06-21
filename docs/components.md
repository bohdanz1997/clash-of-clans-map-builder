Interaction

Two kinds:

- Initiator - performs some action with Target, ex. Pointer
- Target -  with which some action are taken, ex. Building

Interaction States:

- Idle
- Hover
- Click
- Drag
- Drop


###InteractiveInitializer System

Nodes: `PointerContext`, `Interactive`

Transitions:

1. OnAdd

Initiator | +Idle
Target | +Idle

2. OnRemove

Initiator | -Idle
Target | -Idle

adds `Idle` to nodes when its added to the system
removes `Idle` to nodes when its removed from the system

###IdleState System

Nodes: `InitiatorIdle`, `TargetIdle`

Transitions:

1. -> Hover
Hit detected, initiator intersects target

Initiator | -Idle +Interact.Target
Target | -Idle +Hovered +Interact.Initiator

###HoverState System

Nodes: `SourceHovered`

Transitions:

1. -> Idle
Hit lost, initiator doesn't intersect target

Initiator | -Interact.Target +Idle
Target | -Interact.Initiator -Hovered +Idle

2. -> Click
Click detected, initiator clicked on target

Target | -Hovered +Clicked

###ClickState System

Nodes: `SourceClicked`

Transitions:

1. -> Dragging
Target has `Draggable` component

Target | -Clicked +Dragging +Drag

2. -> Hovered
Click lost, initiator release click on target

Target | -Clicked +Hovered

###DragState System

Nodes: `SourceDragging`

Transitions:

1. OnAdd

Target | -BuildingLayer +DragLayer

2. -> Drop
Target was dropped by initiator

Target | -Dragging +Dropped

###DropState System

Nodes: `SourceDropped`

Transitions:

1. -> Hovered

Target | -Dropped -Drag +Hovered | -DragLayer +BuildingLayer
