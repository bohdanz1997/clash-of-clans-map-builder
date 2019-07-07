/* eslint-disable no-underscore-dangle */
import { Key } from './Key'
import { keys } from './keys'

export class Keyboard {
  constructor(target) {
    this.target = target
    this.keys = {}
    this.addedKeys = []
    this.queue = []
    this.time = null
    this.onKeyHandler = null
  }

  createEventHandler = (event) => {
    this.queue.push(event)
  }

  startListeners = () => {
    this.onKeyHandler = this.createEventHandler

    this.target.addEventListener('keydown', this.onKeyHandler, false)
    this.target.addEventListener('keyup', this.onKeyHandler, false)
  }

  stopListeners = () => {
    this.target.removeEventListener('keydown', this.onKeyHandler)
    this.target.removeEventListener('keyup', this.onKeyHandler)
  }

  handleKeyDownEvent = (event) => {
    this.getKey(event.keyCode).processKeyDown(event)
  }

  handleKeyUpEvent = (event) => {
    this.getKey(event.keyCode).processKeyUp(event)
  }

  processQueueEvent = (event) => {
    const { keyCode, type } = event

    if (this.getKey(keyCode)) {
      ({
        keydown: this.handleKeyDownEvent,
        keyup: this.handleKeyUpEvent,
      })[type](event)
    }
  }

  /**
   * @param keyCode
   * @return {Key}
   */
  addKey = (keyCode) => {
    if (!this.getKey(keyCode)) {
      this.keys[keyCode] = new Key(keyCode)
      this.addedKeys.push(keyCode)
    }
    return this.getKey(keyCode)
  }

  /**
   * @param keyCodes
   * @return {Key[]}
   */
  addKeys(...keyCodes) {
    return keyCodes.map(this.addKey)
  }

  removeKey(keyCode) {
    this.addedKeys = this.addedKeys.filter(code => code !== keyCode)
    delete this.keys[keyCode]
  }

  /**
   * @param keyCode
   * @return {Key}
   */
  getKey(keyCode) {
    return this.keys[keyCode]
  }

  isDown(keyCode) {
    return this.keys[keyCode].isDown
  }

  isUp(keyCode) {
    return this.keys[keyCode].isUp
  }

  update(delta) {
    this.time = delta

    this.updateKeys()

    if (this.queue.length > 0) {
      const internalQueue = [...this.queue]
      this.queue = []
      internalQueue.forEach(this.processQueueEvent)
    }
  }

  updateKeys() {
    for (let i = 0; i < this.addedKeys.length; i++) {
      const code = this.addedKeys[i]
      this.keys[code].update()
    }
  }

  start() {
    this.startListeners()
  }

  makeWASDKeys() {
    const [up, down, left, right] = this.addKeys(keys.W, keys.S, keys.A, keys.D)
    return {
      up, down, left, right,
    }
  }

  makeArrowKeys() {
    const [up, down, left, right] = this.addKeys(keys.UP, keys.DOWN, keys.LEFT, keys.RIGHT)
    return {
      up, down, left, right,
    }
  }

  destroy() {
    this.stopListeners()

    this.keys = {}
    this.queue = []
    this.time = null
    this.onKeyHandler = null
  }
}
