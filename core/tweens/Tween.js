class EasingFormulas {
  // Linear
  static linear = x => x

  // Smoothstep
  static smoothstep = x => x * x * (3 - 2 * x)
  static smoothstepSquared = x => Math.pow((x * x * (3 - 2 * x)), 2)
  static smoothstepCubed = x => Math.pow((x * x * (3 - 2 * x)), 3)

  // Acceleration
  static acceleration = x => x * x
  static accelerationCubed = x => Math.pow(x * x, 3)

  // Deceleration
  static deceleration = x => 1 - Math.pow(1 - x, 2)
  static decelerationCubed = x => 1 - Math.pow(1 - x, 3)

  // Sine
  static sine = x => Math.sin(x * Math.PI / 2)
  static sineSquared = x => Math.pow(Math.sin(x * Math.PI / 2), 2)
  static sineCubed = x => Math.pow(Math.sin(x * Math.PI / 2), 2)
  static inverseSine = x => 1 - Math.sin((1 - x) * Math.PI / 2)
  static inverseSineSquared = x => 1 - Math.pow(Math.sin((1 - x) * Math.PI / 2), 2)
  static inverseSineCubed = x => 1 - Math.pow(Math.sin((1 - x) * Math.PI / 2), 3)

  // Spline
  static spline = (t, p0, p1, p2, p3) => 0.5 * (
    (2 * p1)
      + (-p0 + p2) * t
      + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t
      + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t
  )

  // Bezier curve
  static cubicBezier = (t, a, b, c, d) => {
    const t2 = t * t
    const t3 = t2 * t
    return a + (-a * 3 + t * (3 * a - a * t)) * t + (3 * b + t * (-6 * b + b * 3 * t)) * t + (c * 3 - c * 3 * t) * t2 + d * t3
  }
}

export class TweenManager {
  constructor() {
    this.globalTweens = []
  }

  // The low level `tweenProperty` function is used as the foundation
  // for the the higher level tween methods.
  tweenProperty({
    sprite, // Sprite object
    property, // String property
    startValue, // Tween start value
    endValue, // Tween end value
    totalFrames, // Duration in frames
    type = 'smoothstep', // The easing type
    yoyo = false, // Yoyo?
    delayBeforeRepeat = 0, // Delay in frames before repeating
  }) {

    // Create the tween object
    const o = {}

    // If the tween is a bounce type (a spline), set the
    // start and end magnitude values
    const typeArray = type.split(' ')
    if (typeArray[0] === 'bounce') {
      o.startMagnitude = parseInt(typeArray[1])
      o.endMagnitude = parseInt(typeArray[2])
    }

    // Use `o.start` to make a new tween using the current
    // end point values
    o.start = (startValue, endValue) => {

      // Clone the start and end values so that any possible references to sprite
      // properties are converted to ordinary numbers
      o.startValue = JSON.parse(JSON.stringify(startValue))
      o.endValue = JSON.parse(JSON.stringify(endValue))
      o.playing = true
      o.totalFrames = totalFrames
      o.frameCounter = 0

      // Add the tween to the global `tweens` array. The `tweens` array is
      // updated on each frame
      this.globalTweens.push(o)
    }

    // Call `o.start` to start the tween
    o.start(startValue, endValue)

    // The `update` method will be called on each frame by the game loop.
    // This is what makes the tween move
    o.update = () => {

      let time
      let curvedTime

      if (o.playing) {

        // If the elapsed frames are less than the total frames,
        // use the tweening formulas to move the sprite
        if (o.frameCounter < o.totalFrames) {

          // Find the normalized value
          const normalizedTime = o.frameCounter / o.totalFrames

          // Select the correct easing function from the
          // `ease` object’s library of easing functions


          // If it's not a spline, use one of the ordinary easing functions
          if (typeArray[0] !== 'bounce') {
            curvedTime = EasingFormulas[type](normalizedTime)
          }

          // If it's a spline, use the `spline` function and apply the
          // 2 additional `type` array values as the spline's start and
          // end points
          else {
            curvedTime = EasingFormulas.spline(normalizedTime, o.startMagnitude, 0, 1, o.endMagnitude)
          }

          // Interpolate the sprite's property based on the curve
          sprite[property] = (o.endValue * curvedTime) + (o.startValue * (1 - curvedTime))

          o.frameCounter += 1
        }

        // When the tween has finished playing, run the end tasks
        else {
          sprite[property] = o.endValue
          o.end()
        }
      }
    }

    // The `end` method will be called when the tween is finished
    o.end = () => {

      // Set `playing` to `false`
      o.playing = false

      // Call the tween's `onComplete` method, if it's been assigned
      if (o.onComplete) o.onComplete()

      // Remove the tween from the `tweens` array
      this.globalTweens.splice(this.globalTweens.indexOf(o), 1)

      // If the tween's `yoyo` property is `true`, create a new tween
      // using the same values, but use the current tween's `startValue`
      // as the next tween's `endValue`
      if (yoyo) {
        this.wait(delayBeforeRepeat).then(() => {
          o.start(o.endValue, o.startValue)
        })
      }
    }

    // Pause and play methods
    o.play = () => o.playing = true
    o.pause = () => o.playing = false

    // Return the tween object
    return o
  }

  // `makeTween` is a general low-level method for making complex tweens
  // out of multiple `tweenProperty` functions. Its one argument,
  // `tweensToAdd` is an array containing multiple `tweenProperty` calls

  makeTween(tweensToAdd) {

    // Create an object to manage the tweens
    const o = {}

    // Create a `tweens` array to store the new tweens
    o.tweens = []

    // Make a new tween for each array
    tweensToAdd.forEach((tweenPropertyArguments) => {

      // Use the tween property arguments to make a new tween
      const newTween = this.tweenProperty(...tweenPropertyArguments)

      // Push the new tween into this object's internal `tweens` array
      o.tweens.push(newTween)
    })

    // Add a counter to keep track of the
    // number of tweens that have completed their actions
    let completionCounter = 0

    // `o.completed` will be called each time one of the tweens
    // finishes
    o.completed = () => {

      // Add 1 to the `completionCounter`
      completionCounter += 1

      // If all tweens have finished, call the user-defined `onComplete`
      // method, if it's been assigned. Reset the `completionCounter`
      if (completionCounter === o.tweens.length) {
        if (o.onComplete) o.onComplete()
        completionCounter = 0
      }
    }

    // Add `onComplete` methods to all tweens
    o.tweens.forEach((tween) => {
      tween.onComplete = () => o.completed()
    })

    // Add pause and play methods to control all the tweens
    o.pause = () => {
      o.tweens.forEach((tween) => {
        tween.playing = false
      })
    }
    o.play = () => {
      o.tweens.forEach((tween) => {
        tween.playing = true
      })
    }

    // Return the tween object
    return o
  }

  /* High level tween methods */

  // 1. Simple tweens

  // `fadeOut`
  fadeOut(sprite, frames = 60) {
    return this.tweenProperty({
      sprite,
      property: 'alpha',
      startValue: sprite.alpha,
      endValue: 0,
      totalFrames: frames,
      type: 'sine',
    })
  }

  // `fadeIn`
  fadeIn(sprite, frames = 60) {
    return this.tweenProperty({
      sprite,
      property: 'alpha',
      startValue: sprite.alpha,
      endValue: 1,
      totalFrames: frames,
      type: 'sine',
    })
  }


  // 4. Utilities

  /*
  The `wait` method lets you set up a timed sequence of events
    wait(1000)
      .then(() => console.log("One"))
      .then(() => wait(1000))
      .then(() => console.log("Two"))
      .then(() => wait(1000))
      .then(() => console.log("Three"))
  */

  wait(duration = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, duration)
    })
  }

  // A utility to remove tweens from the game
  removeTween(tweenObject) {

    // Remove the tween if `tweenObject` doesn't have any nested
    // tween objects
    if (!tweenObject.tweens) {
      tweenObject.pause()

      // array.splice(-1,1) will always remove last elemnt of array, so this
      // extra check prevents that (Thank you, MCumic10! https://github.com/kittykatattack/charm/issues/5)
      if (this.globalTweens.indexOf(tweenObject) !== -1) {
        this.globalTweens.splice(this.globalTweens.indexOf(tweenObject), 1)
      }

      // Otherwise, remove the nested tween objects
    } else {
      tweenObject.pause()
      tweenObject.tweens.forEach((element) => {
        this.globalTweens.splice(this.globalTweens.indexOf(element), 1)
      })
    }
  }

  update() {
    // Update all the tween objects in the `globalTweens` array
    if (this.globalTweens.length > 0) {
      for (let i = this.globalTweens.length - 1; i >= 0; i--) {
        const tween = this.globalTweens[i]
        if (tween) tween.update()
      }
    }
  }
}
