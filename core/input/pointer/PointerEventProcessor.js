const buttons = {
  LEFT: 0,
  RIGHT: 2,
}

export class PointerEventProcessor {
  constructor(node) {
    // link node components
    this.position = node.position
    this.context = node.context
  }

  onMove = (e) => {
    e.preventDefault()

    // Find the pointer’s x and y position (for mouse).
    // Subtract the element's top and left offset from the browser window
    this.position.x = (e.pageX - e.target.offsetLeft)
    this.position.y = (e.pageY - e.target.offsetTop)
  }

  onTouchMove = (e) => {
    e.preventDefault()

    // Find the touch point's x and y position
    this.position.x = (e.targetTouches[0].pageX - e.target.offsetLeft)
    this.position.y = (e.targetTouches[0].pageY - e.target.offsetTop)
  }

  onDown = (e) => {
    e.preventDefault()

    // Set the down states
    if (e.button === buttons.LEFT) {
      this.context.isDown = true
      this.context.isUp = false
    } else if (e.button === buttons.RIGHT) {
      this.context.isRightDown = true
      this.context.isRightUp = false
    }
    this.context.tapped = false

    // Capture the current time
    this.context.downTime = Date.now()
  }

  onTouchStart = (e) => {
    e.preventDefault()

    // Find the touch point's x and y position
    this.position.x = e.targetTouches[0].pageX - e.target.offsetLeft
    this.position.y = e.targetTouches[0].pageY - e.target.offsetTop

    // Set the down states
    if (e.button === buttons.LEFT) {
      this.context.isDown = true
      this.context.isUp = false
    } else if (e.button === buttons.RIGHT) {
      this.context.isRightDown = true
      this.context.isRightUp = false
    }
    this.context.tapped = false

    // Capture the current time
    this.context.downTime = Date.now()
  }

  onUp = (e) => {
    this.handleUp(e)
  }

  onTouchEnd = (e) => {
    this.handleUp(e)
  }

  handleUp = (e) => {
    // `event.preventDefault()` needs to be disabled to prevent <input> range sliders
    // from getting trapped in Firefox (and possibly Safari)
    // event.preventDefault()

    // Figure out how much time the pointer has been down
    this.context.elapsedTime = Math.abs(this.context.downTime - Date.now())

    // If it's less than 200 milliseconds, it must be a tap or click
    if (this.context.elapsedTime <= 200 && this.context.tapped === false) {
      this.context.tapped = true
    }
    if (e.button === buttons.LEFT) {
      this.context.isUp = true
      this.context.isDown = false
    } else if (e.button === buttons.RIGHT) {
      this.context.isRightUp = true
      this.context.isRightDown = false
    }
  }

  update() {
    this.context.prevDown = this.context.isDown
    this.context.prevUp = this.context.isUp

    this.context.prevRightDown = this.context.isRightDown
    this.context.prevRightUp = this.context.isRightUp
  }
}
