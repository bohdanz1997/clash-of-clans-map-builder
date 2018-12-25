import { system } from 'core/scent'
import { textFactory } from 'core/display'
import * as n from '../nodes'

export const DebugMapLayers = ({ engine, config, app, map }) => {
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

  return system({
    init() {
      buildingLayer = map.getLayer('building')
      dragLayer = map.getLayer('drag')

      app.stage.addChild(buildingLayerText)
      app.stage.addChild(dragLayerText)
    },

    update() {
      buildingLayerText.content = `building layer\n${buildingLayer.toString()}`
      dragLayerText.content = `drag layer\n${dragLayer.toString()}`
    },
  })(n.Hud)(engine)
}
