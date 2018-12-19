import { createSystem } from 'core/scent'
import { textFactory } from 'core/display'
import { MapNode } from '../nodes'

export default ($engine, $config, $app) => {
  let buildingLayer
  let dragLayer

  const buildingLayerText = textFactory.create({
    font: '12px mono',
    fillStyle: 'white',
    x: 1000,
    y: 20,
  })

  const dragLayerText = textFactory.create({
    font: '12px mono',
    fillStyle: 'white',
    x: 1150,
    y: 20,
  })

  return createSystem({
    init(node) {
      const { gameField } = node.head.map

      buildingLayer = gameField.getLayer('building')
      dragLayer = gameField.getLayer('drag')

      $app.stage.addChild(buildingLayerText)
      $app.stage.addChild(dragLayerText)
    },

    update() {
      buildingLayerText.content = `building layer\n${buildingLayer.toString()}`
      dragLayerText.content = `drag layer\n${dragLayer.toString()}`
    },
  })(MapNode)($engine)
}

export const params = {
  enabled: true,
}
