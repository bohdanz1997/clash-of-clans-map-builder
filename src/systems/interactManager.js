import { hitTest } from 'core/collision'
import { withReducer } from 'core/util'
import { createEnhancedSystem } from 'core/scent'
import { gameConfig } from '../config'
import * as c from '../components'
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

const detectHit = (nInteractive, pointerInput) => {
  const { collision, entity } = nInteractive
  const isIso = entity.has(c.cIsoPosition)
  const pointerPos = isIso
    ? pointerInput.cartPosition
    : pointerInput.position

  return hitTest.rect(collision.bounds, pointerPos)
}

export default $engine => createEnhancedSystem({
  updateInteractive(interactive, pointerInput, didHit) {
    // set default UP state
    interactive.state = interactStates.UP
    interactive.action = interactActions.NONE

    // pointer is touching element
    if (didHit) {
      // set default OVER state while pointer is touching
      interactive.state = interactStates.OVER

      if (pointerInput.isDown) {
        // set DOWN state while pointer is pressed
        interactive.state = interactStates.DOWN
      }
    }

    const state = {
      pressed: interactive.pressed,
      action: interactive.action,
    }

    const action = {
      pressed: interactive.pressed,
      state: interactive.state,
    }

    const newState = interactiveReducer(state, action)

    interactive.pressed = newState.pressed
    interactive.action = newState.action

    interactive.hoverOver = didHit

    if (interactive.action === interactActions.PRESSED) {
      interactive.press()
    }

    if (interactive.action === interactActions.RELEASED) {
      interactive.release()
    }
  },

  update(interactiveNodes, pointerNodes) {
    pointerNodes.each(({ pointer }) => {
      interactiveNodes.each((nInteractive) => {
        const { interactive, entityRef: eInteractive } = nInteractive
        const hit = detectHit(nInteractive, pointer.input)

        eInteractive.addOrRemove(c.cHovered, hit)

        this.updateInteractive(interactive, pointer.input, hit)
      })
    })
  },
})(InteractiveNode, PointerNode)($engine)

export const params = {
  priority: gameConfig.priorities.UPDATE,
}
