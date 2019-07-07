import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import { App } from './App'
import { configureStore } from './store'
import './create-builder'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`

const root = document.getElementById('root')
const store = configureStore()

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>,
    root,
  )
}

if (module.hot) {
  module.hot.accept('./App', render)
}

render()
