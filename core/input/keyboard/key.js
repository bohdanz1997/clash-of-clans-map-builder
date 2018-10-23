export default class Key {
  constructor(keyCode) {
    this.code = keyCode
    this.isDown = false
    this.isUp = true
    this.enabled = true
  }

  processKeyUp = (event) => {
    if (!this.enabled) {
      return
    }

    this.isDown = false
    this.isUp = true
  }

  processKeyDown = (event) => {
    if (!this.enabled) {
      return
    }

    if (!this.isDown) {
      this.isDown = true
      this.isUp = false
    }
  }
}
