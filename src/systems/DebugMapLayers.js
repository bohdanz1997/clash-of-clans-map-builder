import { DisplayFactory } from 'core/display'
import * as n from '../nodes'

export const DebugMapLayers = ({ engine, config, stage, map }) => ({
  nodes: [n.Debug],

  init() {
    this.buildingLayer = map.getLayer('building')
    this.dragLayer = map.getLayer('drag')

    this.buildingLayerText = DisplayFactory.text({
      fontSize: '12px',
      fontFamily: 'mono',
      x: 1000,
      y: 20,
    })

    this.dragLayerText = DisplayFactory.text({
      fontSize: '12px',
      fontFamily: 'mono',
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
