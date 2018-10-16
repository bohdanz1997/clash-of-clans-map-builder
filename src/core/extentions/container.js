export const extendContainer = (Container) => {
  Container.prototype.childByName = function childByName(name) {
    return this.children.find(c => c.name === name)
  }
}
