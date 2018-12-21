import { Entity } from 'scent2'

Entity.prototype.safeAdd = function safeAdd(component) {
  if (!this.has(component)) {
    this.add(component)
  }
}

Entity.prototype.safeRemove = function safeRemove(component) {
  if (this.has(component)) {
    this.remove(component)
  }
}

Entity.prototype.addOrRemove = function addOrRemove(component, status) {
  if (status) {
    this.safeAdd(component)
  } else {
    this.safeRemove(component)
  }
}

Entity.prototype.getMany = function getMany(...componentTypes) {
  return componentTypes.map(c => this.get(c))
}
