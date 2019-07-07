import { createGame } from './builder/src/game'
import { testLayout } from './builder/src/layout'
import { LayoutManager } from './builder/src/services'

const savedLayout = LayoutManager.load('layout')

if (savedLayout) {
  console.log('Load layout', savedLayout)
}

createGame({
  layout: savedLayout || testLayout,
})
