import { PIXI } from '../pixi'

/* eslint-disable no-underscore-dangle */
export const spriteMixin = (o) => {

  // Velocity
  o.vx = 0
  o.vy = 0

  // A "private" `_layer` property
  o._layer = 0

  // Is the sprite circular? If it is, it will be given a `radius`
  // and `diameter`
  o._circular = false

  // Is the sprite interactive? Setting this to `true` makes the
  // sprite behave like a button
  o._interact = false

  // Flag this object for compatibility with the Bump collision
  // library
  o._bumpPropertiesAdded = true

  // Swap the depth layer positions of two child sprites
  o.swapChildren = (child1, child2) => {
    const index1 = o.children.indexOf(child1)
    const index2 = o.children.indexOf(child2)

    if (index1 !== -1 && index2 !== -1) {

      // Swap the indexes
      child1.childIndex = index2
      child2.childIndex = index1

      // Swap the array positions
      o.children[index1] = child2
      o.children[index2] = child1
    } else {
      throw new Error(`Both objects must be a child of the caller ${o}`)
    }
  }

  // `add` and `remove` convenience methods let you add and remove
  // many sprites at the same time.
  o.add = (...sprites) => {
    if (sprites.length > 1) {
      sprites.forEach(sprite => o.addChild(sprite))
    } else {
      o.addChild(sprites[0])
    }
  }
  o.remove = (...sprites) => {
    if (sprites.length > 1) {
      sprites.forEach(sprite => o.removeChild(sprite))
    } else {
      o.removeChild(sprites[0])
    }
  }

  // The `put` methods are conveniences that help you position a
  // another sprite in and around this sprite.
  // First, get a short form reference to the sprite to make the code
  // easier to read
  let a = o

  // The `nudgeAnchor`, `compensateForAnchor` and
  // `compensateForAnchors` (with an "s"!) methods are used by
  // the `put` methods to adjust the position of the sprite based on
  // its x/y anchor point.
  const nudgeAnchor = (oo, value, axis) => {
    if (oo.anchor !== undefined) {
      if (oo.anchor[axis] !== 0) {
        return value * ((1 - oo.anchor[axis]) - oo.anchor[axis])
      }
      return value
    }
    return value
  }

  const compensateForAnchor = (oo, value, axis) => {
    if (oo.anchor !== undefined) {
      if (oo.anchor[axis] !== 0) {
        return value * oo.anchor[axis]
      }
      return 0
    }
    return 0
  }

  const compensateForAnchors = (aa, b, property1, property2) => compensateForAnchor(aa, aa[property1], property2) + compensateForAnchor(b, b[property1], property2)

  // The `put` methods:
  // Center a sprite inside this sprite. `xOffset` and `yOffset`
  // arguments determine by how much the other sprite's position
  // should be offset from the center. These methods use the
  // sprites' global coordinates (`gx` and `gy`).
  // In all these functions, `b` is the second sprite that is being
  // positioned relative to the first sprite (this one), `a`.
  // Center `b` inside `a`.
  o.putCenter = (b, xOffset = 0, yOffset = 0) => {
    if (o._stage) a = this.compensateForStageSize(o)
    // b.x = (a.x + a.halfWidth - (b.halfWidth * ((1 - b.anchor.x) - b.anchor.x))) + xOffset
    b.x = (a.x + nudgeAnchor(a, a.halfWidth, 'x') - nudgeAnchor(b, b.halfWidth, 'x')) + xOffset
    b.y = (a.y + nudgeAnchor(a, a.halfHeight, 'y') - nudgeAnchor(b, b.halfHeight, 'y')) + yOffset

    // Compensate for the parent's position
    if (!o._stage) o.compensateForParentPosition(a, b)
  }

  // Position `b` to the left of `a`.
  o.putLeft = (b, xOffset = 0, yOffset = 0) => {
    if (o._stage) a = this.compensateForStageSize(o)
    b.x = (a.x - nudgeAnchor(b, b.width, 'x')) + xOffset - compensateForAnchors(a, b, 'width', 'x')
    b.y = (a.y + nudgeAnchor(a, a.halfHeight, 'y') - nudgeAnchor(b, b.halfHeight, 'y')) + yOffset

    // Compensate for the parent's position
    if (!o._stage) o.compensateForParentPosition(a, b)
  }

  // Position `b` above `a`.
  o.putTop = (b, xOffset = 0, yOffset = 0) => {
    if (o._stage) a = this.compensateForStageSize(o)
    b.x = (a.x + nudgeAnchor(a, a.halfWidth, 'x') - nudgeAnchor(b, b.halfWidth, 'x')) + xOffset
    b.y = (a.y - nudgeAnchor(b, b.height, 'y')) + yOffset - compensateForAnchors(a, b, 'height', 'y')

    // Compensate for the parent's position
    if (!o._stage) o.compensateForParentPosition(a, b)
  }

  // Position `b` to the right of `a`.
  o.putRight = (b, xOffset = 0, yOffset = 0) => {
    if (o._stage) a = this.compensateForStageSize(o)
    b.x = (a.x + nudgeAnchor(a, a.width, 'x')) + xOffset + compensateForAnchors(a, b, 'width', 'x')
    b.y = (a.y + nudgeAnchor(a, a.halfHeight, 'y') - nudgeAnchor(b, b.halfHeight, 'y')) + yOffset
    // b.x = (a.x + a.width) + xOffset
    // b.y = (a.y + a.halfHeight - b.halfHeight) + yOffset

    // Compensate for the parent's position
    if (!o._stage) o.compensateForParentPosition(a, b)
  }

  // Position `b` below `a`.
  o.putBottom = (b, xOffset = 0, yOffset = 0) => {
    if (o._stage) a = this.compensateForStageSize(o)
    // b.x = (a.x + a.halfWidth - b.halfWidth) + xOffset
    b.x = (a.x + nudgeAnchor(a, a.halfWidth, 'x') - nudgeAnchor(b, b.halfWidth, 'x')) + xOffset
    // b.y = (a.y + a.height) + yOffset
    b.y = (a.y + nudgeAnchor(a, a.height, 'y')) + yOffset + compensateForAnchors(a, b, 'height', 'y')

    // Compensate for the parent's position
    if (!o._stage) o.compensateForParentPosition(a, b)
  }

  // `compensateForParentPosition` is a helper function for the above
  // `put` methods that subracts the parent's global position from
  // the nested child's position.
  o.compensateForParentPosition = (aa, b) => {
    if (b.parent.gx !== 0 || b.parent.gy !== 0) {
      b.x -= aa.gx
      b.y -= aa.gy
    }
  }

  const self = this
  Object.defineProperties(o, {
    gx: {
      get() {
        return o.getGlobalPosition().x
      },
      enumerable: true,
      configurable: true,
    },
    gy: {
      get() {
        return o.getGlobalPosition().y
      },
      enumerable: true,
      configurable: true,
    },
    centerX: {
      get() {
        return o.x + (o.width / 2) - o.xAnchorOffset
      },
      enumerable: true,
      configurable: true,
    },
    centerY: {
      get() {
        return o.y + (o.height / 2) - o.yAnchorOffset
      },
      enumerable: true,
      configurable: true,
    },
    halfWidth: {
      get() {
        return o.width / 2
      },
      enumerable: true,
      configurable: true,
    },
    halfHeight: {
      get() {
        return o.height / 2
      },
      enumerable: true,
      configurable: true,
    },
    scaleModeNearest: {
      set(value) {
        if (o.texture.baseTexture) {
          if (value) {
            o.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
          } else {
            o.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR
          }
        } else {
          throw new Error(`The scale mode of ${o} cannot be modified`)
        }
      },
      enumerable: true,
      configurable: true,
    },
    pivotX: {
      get() {
        return o.anchor.x
      },
      set(value) {
        if (o.anchor === undefined) {
          throw new Error(`${o} does not have a PivotX value`)
        }
        o.anchor.x = value
        if (!o._previousPivotX) {
          o.x += value * o.width
        } else {
          o.x += (value - o._previousPivotX) * o.width
        }
        o._previousPivotX = value
      },
      enumerable: true,
      configurable: true,
    },
    pivotY: {
      get() {
        return o.anchor.y
      },
      set(value) {
        if (o.anchor === undefined) {
          throw new Error(`${o} does not have a PivotY value`)
        }
        o.anchor.y = value
        if (!o._previousPivotY) {
          o.y += value * o.height
        } else {
          o.y += (value - o._previousPivotY) * o.height
        }
        o._previousPivotY = value
      },
      enumerable: true,
      configurable: true,
    },
    xAnchorOffset: {
      get() {
        if (o.anchor !== undefined) {
          return o.height * o.anchor.x
        }
        return 0

      },
      enumerable: true,
      configurable: true,
    },
    yAnchorOffset: {
      get() {
        if (o.anchor !== undefined) {
          return o.width * o.anchor.y
        }
        return 0

      },
      enumerable: true,
      configurable: true,
    },
    scaleX: {
      get() {
        return o.scale.x
      },
      set(value) {
        o.scale.x = value
      },
      enumerable: true,
      configurable: true,
    },
    scaleY: {
      get() {
        return o.scale.y
      },
      set(value) {
        o.scale.y = value
      },
      enumerable: true,
      configurable: true,
    },

    // Depth layer
    layer: {
      get() {
        return o._layer
      },
      set(value) {
        o._layer = value
        if (o.parent) {
          // Sort the sprite’s parent’s `children` array so that sprites with a
          // higher `layer` value are moved to the end of the array
          o.parent.children.sort((aa, b) => aa.layer - b.layer)
        }
      },
      enumerable: true,
      configurable: true,
    },

    // Interactivity
    // interact: {
    //   get() {
    //     return o._interact
    //   },
    //   set(value) {
    //     if (value === true) {
    //       if (!o._interact) {
    //         self.makeInteractive(o)
    //         o._interact = true
    //       }
    //     } else if (self.tink.buttons.indexOf(o) !== -1) {
    //       self.tink.buttons.splice(self.tink.buttons.indexOf(o), 1)
    //       o._interact = false
    //     }
    //   },
    //   enumerable: true,
    //   configurable: true,
    // },

    // The `localBounds` and `globalBounds` methods return an object
    // with `x`, `y`, `width`, and `height` properties that define
    // the dimensions and position of the sprite. This is a convenience
    // to help you set or test boundaries without having to know
    // these numbers or request them specifically in your code.
    localBounds: {
      get() {
        return {
          x: 0,
          y: 0,
          width: o.width,
          height: o.height,
        }
      },
      enumerable: true,
      configurable: true,
    },
    globalBounds: {
      get() {
        return {
          x: o.gx,
          y: o.gy,
          width: o.gx + o.width,
          height: o.gy + o.height,
        }
      },
      enumerable: true,
      configurable: true,
    },

    // `empty` is a convenience property that will return `true` or
    // `false` depending on whether or not this sprite's `children`
    // array is empty
    empty: {
      get() {
        if (o.children.length === 0) {
          return true
        }
        return false

      },
      enumerable: true,
      configurable: true,
    },

    // The `circular` property lets you define whether a sprite
    // should be interpreted as a circular object. If you set
    // `circular` to `true`, the sprite is given `radius` and `diameter`
    // properties. If you set `circular` to `false`, the `radius`
    // and `diameter` properties are deleted from the sprite
    circular: {
      get() {
        return o._circular
      },
      set(value) {

        // Give the sprite `diameter` and `radius` properties
        // if `circular` is `true`
        if (value === true && o._circular === false) {
          Object.defineProperties(o, {
            diameter: {
              get() {
                return o.width
              },
              set(_value) {
                o.width = _value
                o.height = _value
              },
              enumerable: true,
              configurable: true,
            },
            radius: {
              get() {
                return o.halfWidth
              },
              set(_value) {
                o.width = _value * 2
                o.height = _value * 2
              },
              enumerable: true,
              configurable: true,
            },
          })

          // Set o.sprite's `_circular` property to `true`
          o._circular = true
        }

        // Remove the sprite's `diameter` and `radius` properties
        // if `circular` is `false`
        if (value === false && o._circular === true) {
          delete o.diameter
          delete o.radius
          o._circular = false
        }
      },
      enumerable: true,
      configurable: true,
    },
  })

  // A `setPosition` convenience method to let you set the
  // x any y position of a sprite with one line of code.
  o.setPosition = (x, y) => {
    o.x = x
    o.y = y
  }

  // A similar `setScale` convenience method
  o.setScale = (xScale, yScale) => {
    o.scale.x = xScale
    o.scale.y = yScale
  }

  // And a matching `setPivot` method
  o.setPivot = (xPivot, yPivot) => {
    o.pivotX = xPivot
    o.pivotY = yPivot
  }

  if (o.circular) {
    Object.defineProperty(o, 'radius', {
      get() {
        return o.width / 2
      },
      enumerable: true,
      configurable: true,
    })
  }
}
