import { PointerEventProcessor } from './PointerEventProcessor'

const eventToHandler = {
  mousemove: 'onMove',
  mousedown: 'onDown',
  mouseup: 'onUp',
  touchmove: 'onTouchMove',
  touchstart: 'onTouchStart',
  touchend: 'onTouchEnd',
}

export class PointerManager {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.target = game.config.inputTouchEventTarget
    this.queue = []

    /** @type {PointerEventProcessor[]} */
    this.processors = []
  }

  start() {
    // Bind the events to the handlers
    // Mouse events
    this.target.addEventListener('mousemove', this.addToQueue, false)
    this.target.addEventListener('mousedown', this.addToQueue, false)

    // Add the `mouseup` event to the `window` to
    // catch a mouse button release outside of the canvas area
    window.addEventListener('mouseup', this.addToQueue, false)

    // Touch events
    this.target.addEventListener('touchmove', this.addToQueue, false)
    this.target.addEventListener('touchstart', this.addToQueue, false)

    // Add the `touchend` event to the `window` object to
    // catch a mouse button release outside of the canvas area
    window.addEventListener('touchend', this.addToQueue, false)

    // Disable the default pan and zoom actions on the `canvas`
    this.target.style.touchAction = 'none'
  }

  /**
   * @param pointerNode
   * @returns {PointerEventProcessor}
   */
  add(pointerNode) {
    const processor = new PointerEventProcessor(pointerNode)
    this.processors.push(processor)
    return processor
  }

  remove(processor) {
    this.processors = this.processors.filter(proc => proc !== processor)
  }

  destroy() {
    this.target.removeEventListener('mousemove', this.addToQueue, false)
    this.target.removeEventListener('mousedown', this.addToQueue, false)
    this.target.removeEventListener('touchmove', this.addToQueue, false)
    this.target.removeEventListener('touchstart', this.addToQueue, false)

    window.removeEventListener('mouseup', this.addToQueue, false)
    window.removeEventListener('touchend', this.addToQueue, false)
  }

  update(delta) {
    this.updateProcessors()

    if (this.queue.length > 0) {
      const internalQueue = [...this.queue]
      this.queue = []

      for (let i = 0; i < internalQueue.length; i++) {
        this.processEvent(internalQueue[i])
      }
    }
  }

  addToQueue = (event) => {
    this.queue.push(event)
  }

  processEvent = (event) => {
    const handlerName = eventToHandler[event.type]

    for (let i = 0; i < this.processors.length; i++) {
      this.processors[i][handlerName](event)
    }
  }

  updateProcessors() {
    for (let i = 0; i < this.processors.length; i++) {
      this.processors[i].update()
    }
  }

  setCursorStyle(value) {
    this.target.style.cursor = value
  }
}
