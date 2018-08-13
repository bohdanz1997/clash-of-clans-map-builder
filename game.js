import { Engine, Component, Entity } from 'scent'

const engine = new Engine()

const cDoor = new Component('door', 'open material')

engine.registerComponent(cDoor)

const closeDoorSystem = () => {
  const nDoor = engine.getNodeType(['door'])

  const closingTime = {
    wood: 200,
    metal: 300,
    stone: 500,
  }

  const loopDoorNode = (node, timestamp) => {
    // console.log('update door node')
    const { door } = node
    console.log(door.open, timestamp + closingTime[door.material])
    if (door.open >= timestamp + closingTime[door.material]) {
      console.log('close door')
      door.open = false
    }
  }

  engine.onUpdate(timestamp => nDoor.each(loopDoorNode, timestamp))
}

engine.addSystem(closeDoorSystem)

engine.start()

const door = new cDoor()
door.material = 'wood'
const eDoor = engine.buildEntity([door])

engine.onAction('doorOpen', (action) => {
  const _eDoor = action.data
  _eDoor.get('door').open = Date.now()
})

engine.triggerAction('doorOpen', eDoor)

engine.update(Date.now())

const entity = new Entity([cDoor])
console.log(entity)
