export class ComponentInstanceProvider {
  instance

  constructor(instance) {
    this.instance = instance
  }

  getComponent() {
    return this.instance
  }

  getIdentifier() {
    return this.instance
  }
}
