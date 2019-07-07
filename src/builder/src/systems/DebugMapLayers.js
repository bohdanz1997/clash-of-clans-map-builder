import { useNodes, onUpdate } from 'core/ecs'
import { View } from 'core/display'
import * as n from '../nodes'

export const DebugMapLayers = ({ engine, config, stage, map }) => {
  const buildingLayer = map.getLayer('building')
  const dragLayer = map.getLayer('drag')

  const buildingLayerText = View.text({
    fontSize: '12px',
    fontFamily: 'mono',
  }, {
    x: 1000,
    y: 20,
  })

  const dragLayerText = View.text({
    fontSize: '12px',
    fontFamily: 'mono',
  }, {
    x: 1150,
    y: 20,
  })

  stage.addChild(buildingLayerText)
  stage.addChild(dragLayerText)

  useNodes([n.Debug])

  onUpdate(() => {
    buildingLayerText.text = `building layer\n${buildingLayer.toString()}`
    dragLayerText.text = `drag layer\n${dragLayer.toString()}`
  })
}
