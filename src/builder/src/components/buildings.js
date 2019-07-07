import { component } from 'core/ecs'

class BuildingData {
  constructor(def) {
    this.def = def
  }
}
export const Building = component('building', BuildingData)

export const DefenceBuilding = component('defenceBuilding')
export const ServiceBuilding = component('serviceBuilding')
export const ResourceBuilding = component('resourceBuilding')
export const Wall = component('wall')
