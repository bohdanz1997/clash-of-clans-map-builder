import { PointerEventProcessor } from './PointerEventProcessor'

export class PointerManager {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.target = game.config.inputTouchEventTarget
  }

  /**
   * @param pointerNode
   * @returns {PointerEventProcessor}
   */
  subscribe(pointerNode) {
    const processor = new PointerEventProcessor(pointerNode)

    // Bind the events to the handlers
    // Mouse events
    this.target.addEventListener('mousemove', processor.onMove, false)
    this.target.addEventListener('mousedown', processor.onDown, false)

    // Add the `mouseup` event to the `window` to
    // catch a mouse button release outside of the canvas area
    window.addEventListener('mouseup', processor.onUp, false)

    // Touch events
    this.target.addEventListener('touchmove', processor.onTouchMove, false)
    this.target.addEventListener('touchstart', processor.onTouchStart, false)

    // Add the `touchend` event to the `window` object to
    // catch a mouse button release outside of the canvas area
    window.addEventListener('touchend', processor.onTouchEnd, false)

    // Disable the default pan and zoom actions on the `canvas`
    this.target.style.touchAction = 'none'

    return processor
  }

  /**
   * @param processor
   */
  unsubscribe(processor) {
    this.target.removeEventListener('mousemove', processor.onMove, false)
    this.target.removeEventListener('mousedown', processor.onDown, false)
    this.target.removeEventListener('touchmove', processor.onTouchMove, false)
    this.target.removeEventListener('touchstart', processor.onTouchStart, false)

    window.removeEventListener('mouseup', processor.onUp, false)
    window.removeEventListener('touchend', processor.onTouchEnd, false)
  }

  setCursorStyle(value) {
    this.target.style.cursor = value
  }
}
