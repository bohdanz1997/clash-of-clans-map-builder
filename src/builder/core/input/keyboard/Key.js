export class Key {
  constructor(keyCode) {
    this.code = keyCode
    this.isDown = false
    this.isUp = true
    this.justDown = false
    this.justUp = false
    this.enabled = true
  }

  processKeyUp = () => {
    if (!this.enabled) {
      return
    }

    if (!this.isUp) {
      this.justUp = true
    }

    this.isDown = false
    this.isUp = true
  }

  processKeyDown = () => {
    if (!this.enabled) {
      return
    }

    if (!this.isDown) {
      this.justDown = true
    }

    this.isDown = true
    this.isUp = false
  }

  update() {
    this.justUp = false
    this.justDown = false
  }
}
