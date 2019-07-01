import { component } from 'core/ecs'

class SerializableData {
  constructor(serialize) {
    this.serialize = serialize
  }
}

export const Serializable = component('serializable', SerializableData)

export const Serializer = component('serializer')
