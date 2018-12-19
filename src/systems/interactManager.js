import { hitTest } from 'core/collision'
import { withReducer } from 'core/util'
import { createEnhancedSystem } from 'core/factories'
import { gameConfig } from '../config'
import { PointerNode, InteractiveNode } from '../nodes'
import { interactActions, interactStates } from '../constants'

const interactiveReducer = withReducer((state, action) => ({
  [interactStates.DOWN]: () => (!action.pressed ? {
    pressed: true,
    action: interactActions.PRESSED,
  } : state),

  [interactStates.OVER]: () => (action.pressed ? {
    pressed: false,
    action: interactActions.RELEASED,
  } : state),

  [interactStates.UP]: () => ((action.pressed) ? {
    pressed: false,
    action: interactActions.RELEASED,
  } : state),
}[action.state]))

export default ($engine, $config) => createEnhancedSystem({
  updateInteractive(interactive, pointer, hit) {
    // set default UP state
    interactive.state = interactStates.UP
    interactive.action = interactActions.NONE

    // pointer is touching element
    if (hit) {
      // set default OVER state while pointer is touching
      interactive.state = interactStates.OVER

      if (pointer.isDown) {
        // set DOWN state while pointer is pressed
        interactive.state = interactStates.DOWN
      }
    }

    const state = {
      pressed: interactive.pressed,
      action: interactive.action,
    }

    const action = {
      state: interactive.state,
      pressed: interactive.pressed,
    }

    const newState = interactiveReducer(state, action)

    interactive.pressed = newState.pressed
    interactive.action = newState.action

    if (interactive.action === interactActions.PRESSED) {
      interactive.press()
    }

    if (interactive.action === interactActions.RELEASED) {
      interactive.release()
    }
  },

  update(interactiveNode, pointerNode) {
    const cPointer = pointerNode.head.pointer
    const { pointer } = cPointer
    let hitDetected = false

    interactiveNode.each((item) => {
      const { collision, interactive } = item
      const hit = hitTest.rect(collision.bounds, pointer.position)
      if (hit) hitDetected = true

      this.updateInteractive(interactive, pointer, hit)
    })

    // pointer.cursor = (hitDetected && pointer.visible) ? 'pointer' : 'auto'
  },
})(InteractiveNode, PointerNode)($engine)

export const params = {
  priority: gameConfig.priorities.UPDATE,
}
