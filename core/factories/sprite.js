import {
  getTextureFromCache,
  Sprite,
  Text,
} from 'core/pixi'

export const createSprite = (textureId, x = 0, y = 0, width = undefined, height = undefined) => {
  const texture = getTextureFromCache(textureId)

  const sprite = new Sprite(texture)
  sprite.position.set(x, y)
  sprite.width = width || sprite.width
  sprite.height = height || sprite.height

  return sprite
}

export const createText = ({
  content = 'message',
  font = '16px sans',
  fillStyle = 'red',
  x = 0,
  y = 0,
}) => {
  // Create a Pixi Sprite object
  const message = new Text(content, { font, fill: fillStyle })
  message.x = x
  message.y = y

  // Add a `_text` property with a getter/setter
  message._content = content
  Object.defineProperty(message, 'content', {
    get() {
      return this._content
    },
    set(value) {
      this._content = value
      this.text = value
    },
    enumerable: true,
    configurable: true,
  })

  // Return the text object
  return message
}
