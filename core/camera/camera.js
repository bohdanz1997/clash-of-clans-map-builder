import { Point } from 'core/pixi'

export const createCamera = ({ world, worldWidth, worldHeight, width, height }) => {
  const position = Point.EMPTY
  const hWidth = width / 2
  const hHeight = height / 2
  const qWidth = width / 4
  const qHeight = height / 4

  // Define a `camera` object with helpful properties
  return {
    // `x` and `y` getters/setters
    // When you change the camera's position,
    // they shift the position of the world in the opposite direction
    get x() {
      return position.x
    },
    set x(value) {
      position.x = value
      world.x = -position.x
    },

    get y() {
      return position.y
    },
    set y(value) {
      position.y = value
      world.y = -position.y
    },

    get position() {
      return position
    },

    // The center x and y position of the camera
    get centerX() {
      return this.x + hWidth
    },
    get centerY() {
      return this.y + hHeight
    },

    // Boundary properties that define a rectangular area, half the size
    // of the game screen. If the sprite that the camera is following
    // is inside this area, the camera won't scroll. If the sprite
    // crosses this boundary, the `follow` function ahead will change
    // the camera's x and y position to scroll the game world
    get rightInnerBoundary() {
      return this.x + hWidth + qWidth
    },
    get leftInnerBoundary() {
      return this.x + hWidth - qWidth
    },
    get topInnerBoundary() {
      return this.y + hHeight - qHeight
    },
    get bottomInnerBoundary() {
      return this.y + hHeight + qHeight
    },

    // Use the `follow` method to make the camera follow a sprite
    follow(sprite) {
      // Check the sprites position in relation to the inner
      // boundary. Move the camera to follow the sprite if the sprite
      // stays outside the boundary
      if (sprite.x < this.leftInnerBoundary) {
        this.x = sprite.x - qWidth
      }
      if (sprite.y < this.topInnerBoundary) {
        this.y = sprite.y - qHeight
      }
      if (sprite.x + sprite.width > this.rightInnerBoundary) {
        this.x = sprite.x + sprite.width - (this.width / 4 * 3)
      }
      if (sprite.y + sprite.height > this.bottomInnerBoundary) {
        this.y = sprite.y + sprite.height - (this.height / 4 * 3)
      }

      // If the camera reaches the edge of the map, stop it from moving
      if (this.x < 0) {
        this.x = 0
      }
      if (this.y < 0) {
        this.y = 0
      }
      if (this.x + this.width > worldWidth) {
        this.x = worldWidth - this.width
      }
      if (this.y + this.height > worldHeight) {
        this.y = worldHeight - this.height
      }
    },

    // Use the `centerOver` method to center the camera over a sprite
    centerOver(sprite) {
      // Center the camera over a sprite
      this.x = (sprite.x + sprite.width / 2) - hWidth
      this.y = (sprite.y + sprite.height / 2) - hHeight
    },
  }
}
