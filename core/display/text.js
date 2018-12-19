import { Text } from 'core/pixi'

const createText = ({
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

export const textFactory = {
  create: createText,
}
