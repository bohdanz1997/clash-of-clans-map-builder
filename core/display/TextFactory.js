/* eslint-disable no-underscore-dangle */
import { Text } from 'pixi.js'

export class TextFactory {
  static create({
    content = 'empty message',
    fontSize = 16,
    fontFamily = 'sans',
    fill = 'red',
    x = 0,
    y = 0,
  }) {
    const message = new Text(content, {
      fontSize,
      fontFamily,
      fill,
    })
    message.x = x
    message.y = y

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

    return message
  }
}
