import { createGame } from './game'
import { testLayout } from './layout'
import { LayoutManager } from './services'

const savedLayout = LayoutManager.load('layout')

if (savedLayout) {
  console.log('Load layout', savedLayout)
}

createGame({
  layout: savedLayout || testLayout,
})
