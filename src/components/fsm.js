import { component } from 'core/scent'
import { EntityStateMachine } from 'core/fsm'

class FSMRaw {
  fsm
  setInitial = null

  constructor({ entity }) {
    this.fsm = new EntityStateMachine(entity)
  }
}

export const FSM = component('fsm', FSMRaw)
