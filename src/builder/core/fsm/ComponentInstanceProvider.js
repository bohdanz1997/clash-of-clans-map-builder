import { ComponentProvider } from './ComponentProvider'

export class ComponentInstanceProvider extends ComponentProvider {
  instance

  constructor(instance) {
    super()
    this.instance = instance
  }

  getComponent() {
    return this.instance
  }

  getIdentifier() {
    return this.instance
  }
}
