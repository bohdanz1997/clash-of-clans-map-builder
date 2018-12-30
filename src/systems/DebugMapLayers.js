import { textFactory } from 'core/display'
import * as n from '../nodes'

export default ({ engine, config, app, map }) => ({
  nodes: [n.Hud],

  init() {
    this.buildingLayer = map.getLayer('building')
    this.dragLayer = map.getLayer('drag')

    this.buildingLayerText = textFactory.create({
      font: '12px mono',
      fillStyle: 'white',
      x: 1000,
      y: 20,
    })

    this.dragLayerText = textFactory.create({
      font: '12px mono',
      fillStyle: 'white',
      x: 1150,
      y: 20,
    })

    app.stage.addChild(this.buildingLayerText)
    app.stage.addChild(this.dragLayerText)
  },

  update() {
    this.buildingLayerText.content = `building layer\n${this.buildingLayer.toString()}`
    this.dragLayerText.content = `drag layer\n${this.dragLayer.toString()}`
  },
})
