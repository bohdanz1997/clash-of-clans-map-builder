import { TextFactory } from 'core/display'
import * as n from '../nodes'

export const DebugMapLayers = ({ engine, config, stage, map }) => ({
  nodes: [n.Debug],

  init() {
    this.buildingLayer = map.getLayer('building')
    this.dragLayer = map.getLayer('drag')

    this.buildingLayerText = TextFactory.create({
      font: '12px mono',
      fillStyle: 'white',
      x: 1000,
      y: 20,
    })

    this.dragLayerText = TextFactory.create({
      font: '12px mono',
      fillStyle: 'white',
      x: 1150,
      y: 20,
    })

    stage.addChild(this.buildingLayerText)
    stage.addChild(this.dragLayerText)
  },

  update() {
    this.buildingLayerText.content = `building layer\n${this.buildingLayer.toString()}`
    this.dragLayerText.content = `drag layer\n${this.dragLayer.toString()}`
  },
})
