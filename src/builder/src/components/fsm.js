import { component } from 'core/ecs'
import { EntityStateMachine } from 'core/fsm'

class FSMRaw {
  fsm

  constructor(entity) {
    this.fsm = new EntityStateMachine(entity)
  }
}

export const FSM = component('fsm', FSMRaw)
export const InteractFSM = component('interactFsm', FSMRaw)
