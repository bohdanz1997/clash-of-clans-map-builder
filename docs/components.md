Interaction

Two kinds:

- Client - initiator, performs some action with Source, ex. Pointer
- Source - target, with which some action are taken, ex. Building

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

Client | +Idle
Source | +Idle

2. OnRemove

Client | -Idle
Source | -Idle

adds `Idle` to nodes when its added to the system
removes `Idle` to nodes when its removed from the system

###IdleState System

Nodes: `InteractiveClient`, `InteractiveSource`

Transitions:

1. -> Hover
Hit detected, client intersects source

Client | -Idle +Interact.Source
Source | -Idle +Hovered +Interact.Client

###HoverState System

Nodes: `SourceHovered`

Transitions:

1. -> Idle
Hit lost, client doesn't intersect source

Client | -Interact.Source +Idle
Source | -Interact.Client -Hovered +Idle

2. -> Click
Click detected, client clicked on source

Source | -Hovered +Clicked

###ClickState System

Nodes: `SourceClicked`

Transitions:

1. -> Dragging
Source has `Draggable` component

Source | -Clicked +Dragging +Drag

2. -> Hovered
Click lost, client release click on source

Source | -Clicked +Hovered

###DragState System

Nodes: `SourceDragging`

Transitions:

1. OnAdd

Source | -BuildingLayer +DragLayer

2. -> Drop
Source was dropped by client

Source | -Dragging +Dropped

###DropState System

Nodes: `SourceDropped`

Transitions:

1. -> Hovered

Source | -Dropped -Drag +Hovered | -DragLayer +BuildingLayer
