import { Point } from 'core/pixi'

export const makePointer = ({ element, scale = 1 }) => {
  const position = new Point(0, 0)

  let pScale = scale
  let visible = true

  // The pointer object will be returned by this function
  const pointer = {
    // The public x and y properties are divided by the scale. If the
    // HTML element that the pointer is sensitive to (like the canvas)
    // is scaled up or down, you can change the `scale` value to
    // correct the pointer's position values
    get x() {
      return position.x / pScale
    },

    get y() {
      return position.y / pScale
    },

    get position() {
      return position
    },

    // Add `centerX` and `centerY` getters so that we
    // can use the pointer's coordinates with easing
    // and collision functions
    get centerX() {
      return this.x
    },
    get centerY() {
      return this.y
    },

    get scale() {
      return pScale
    },
    set scale(value) {
      pScale = value
    },

    // Add a `cursor` getter/setter to change the pointer's cursor
    // style. Values can be "pointer" (for a hand icon) or "auto" for
    // an ordinary arrow icon.
    get cursor() {
      return element.style.cursor
    },
    set cursor(value) {
      element.style.cursor = value
    },

    // Booleans to track the pointer state
    isDown: false,
    isUp: true,
    tapped: false,

    // Properties to help measure the time between up and down states
    downTime: 0,
    elapsedTime: 0,

    // Optional `press`,`release` and `tap` methods
    press: undefined,
    release: undefined,
    tap: undefined,

    // A `dragSprite` property to help with drag and drop
    dragSprite: null,

    // The drag offsets to help drag sprites
    dragOffsetX: 0,
    dragOffsetY: 0,

    // A property to check whether or not the pointer
    // is visible
    get visible() {
      return visible
    },
    set visible(value) {
      if (value === true) {
        this.cursor = 'auto'
      } else {
        this.cursor = 'none'
      }
      visible = value
    },

    moveHandler(event) {
      // Get the element that's firing the event
      const { target } = event

      // Find the pointer’s x and y position (for mouse).
      // Subtract the element's top and left offset from the browser window
      position.x = (event.pageX - target.offsetLeft)
      position.y = (event.pageY - target.offsetTop)

      // Prevent the event's default behavior
      event.preventDefault()
    },

    touchMoveHandler(event) {
      const { target } = event

      // Find the touch point's x and y position
      position.x = (event.targetTouches[0].pageX - target.offsetLeft)
      position.y = (event.targetTouches[0].pageY - target.offsetTop)
      event.preventDefault()
    },

    downHandler(event) {
      // Set the down states
      this.isDown = true
      this.isUp = false
      this.tapped = false

      // Capture the current time
      this.downTime = Date.now()

      // Call the `press` method if it's been assigned
      if (this.press) this.press()
      event.preventDefault()
    },

    touchStartHandler(event) {
      const { target } = event

      // Find the touch point's x and y position
      position.x = event.targetTouches[0].pageX - target.offsetLeft
      position.y = event.targetTouches[0].pageY - target.offsetTop

      // Set the down states
      this.isDown = true
      this.isUp = false
      this.tapped = false

      // Capture the current time
      this.downTime = Date.now()

      // Call the `press` method if it's been assigned
      if (this.press) this.press()
      event.preventDefault()
    },

    upHandler(event) {
      // Figure out how much time the pointer has been down
      this.elapsedTime = Math.abs(this.downTime - Date.now())

      // If it's less than 200 milliseconds, it must be a tap or click
      if (this.elapsedTime <= 200 && this.tapped === false) {
        this.tapped = true

        // Call the `tap` method if it's been assigned
        if (this.tap) this.tap()
      }
      this.isUp = true
      this.isDown = false

      // Call the `release` method if it's been assigned
      if (this.release) this.release()

      // `event.preventDefault()` needs to be disabled to prevent <input> range sliders
      // from getting trapped in Firefox (and possibly Safari)
      // event.preventDefault()
    },

    touchEndHandler(event) {
      // Figure out how much time the pointer has been down
      this.elapsedTime = Math.abs(this.downTime - Date.now())

      // If it's less than 200 milliseconds, it must be a tap or click
      if (this.elapsedTime <= 200 && this.tapped === false) {
        this.tapped = true

        // Call the `tap` method if it's been assigned
        if (this.tap) this.tap()
      }
      this.isUp = true
      this.isDown = false

      // Call the `release` method if it's been assigned
      if (this.release) this.release()

      // event.preventDefault()
    },
  }

  // Bind the events to the handlers
  // Mouse events
  element.addEventListener(
    'mousemove', pointer.moveHandler.bind(pointer), false
  )
  element.addEventListener(
    'mousedown', pointer.downHandler.bind(pointer), false
  )

  // Add the `mouseup` event to the `window` to
  // catch a mouse button release outside of the canvas area
  window.addEventListener(
    'mouseup', pointer.upHandler.bind(pointer), false
  )

  // Touch events
  element.addEventListener(
    'touchmove', pointer.touchMoveHandler.bind(pointer), false
  )
  element.addEventListener(
    'touchstart', pointer.touchStartHandler.bind(pointer), false
  )

  // Add the `touchend` event to the `window` object to
  // catch a mouse button release outside of the canvas area
  window.addEventListener(
    'touchend', pointer.touchEndHandler.bind(pointer), false
  )

  // Disable the default pan and zoom actions on the `canvas`
  element.style.touchAction = 'none'

  // Return the pointer
  return pointer
}
