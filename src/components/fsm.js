import { defComponent } from 'core/scent'
import { EntityStateMachine } from 'core/fsm'

class FSMRaw {
  fsm

  constructor(entity) {
    this.fsm = new EntityStateMachine(entity)
  }
}

export const FSM = defComponent('fsm', FSMRaw)
