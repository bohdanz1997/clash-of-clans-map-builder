import Key from './key'

export default class Keyboard {
  constructor(target) {
    this._target = target
    this._keys = {}
    this._queue = []
    this._time = null
    this._onKeyHandler = null
  }

  _createEventHandler = (event) => {
    this._queue.push(event)
  }

  _startListeners = () => {
    this._onKeyHandler = this._createEventHandler

    this._target.addEventListener('keydown', this._onKeyHandler, false)
    this._target.addEventListener('keyup', this._onKeyHandler, false)
  }

  _stopListeners = () => {
    this._target.removeEventListener('keydown', this._onKeyHandler)
    this._target.removeEventListener('keyup', this._onKeyHandler)
  }

  _handleKeyDownEvent = (event) => {
    this.getKey(event.keyCode).processKeyDown(event)
  }

  _handleKeyUpEvent = (event) => {
    this.getKey(event.keyCode).processKeyUp(event)
  }

  _processQueueEvent = (event) => {
    const { keyCode, type } = event

    if (this.getKey(keyCode)) {
      ({
        keydown: this._handleKeyDownEvent,
        keyup: this._handleKeyUpEvent,
      })[type](event)
    }
  }

  addKey = (keyCode) => {
    if (!this.getKey(keyCode)) {
      this._keys[keyCode] = new Key(keyCode)
    }
    return this.getKey(keyCode)
  }

  addKeys(...keyCodes){
    return keyCodes.map(this.addKey)
  }

  removeKey(keyCode) {
    delete this._keys[keyCode]
  }

  getKey(keyCode) {
    return this._keys[keyCode]
  }

  isDown(keyCode) {
    return this._keys[keyCode].isDown
  }

  isUp(keyCode) {
    return this._keys[keyCode].isUp
  }

  update(delta) {
    this._time = delta

    if (this._queue.length > 0) {
      const internalQueue = [...this._queue]
      this._queue = []
      internalQueue.forEach(this._processQueueEvent)
    }
  }

  start() {
    this._startListeners()
  }

  destroy() {
    this._stopListeners()

    this._keys = {}
    this._queue = []
    this._time = null
    this._onKeyHandler = null
  }
}
