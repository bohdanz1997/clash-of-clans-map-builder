import { ComponentProvider } from './ComponentProvider'

export class DynamicComponentProvider extends ComponentProvider {
  callback

  constructor(callback) {
    super()
    this.callback = callback
  }

  getComponent(params) {
    return this.callback(params)
  }

  getIdentifier() {
    return this.callback
  }
}
