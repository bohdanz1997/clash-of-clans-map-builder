import React, { useState } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter, Route } from 'react-router-dom'

import { LayoutList } from './features/builder/LayoutList'
import { LayoutBuilder } from './features/builder/LayoutBuilder'

const getLayouts = () => {
  const items = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!!key.match(/layout/)) {
      items.push(JSON.parse(localStorage.getItem(key)))
    }
  }
  return items
}

const Main = () => {
  const [layouts, setLayouts] = useState(getLayouts())

  const remove = (id) => {
    localStorage.removeItem(`layout-${id}`)
    setLayouts(layouts.filter(item => item.id !== id))
  }

  const saveNew = () => {
    console.log(getLayouts())
  }

  const saveExist = () => {
    console.log(getLayouts())
  }

  return (
    <BrowserRouter>
      <Route exact path="/" render={(props) => <LayoutList {...props} layouts={layouts} onRemove={remove} />} />
      <Route exact path="/layout" render={(props) => <LayoutBuilder {...props} layouts={layouts} onSave={saveNew} />} />
      <Route path="/layout/:id" render={(props) => <LayoutBuilder {...props} layouts={layouts} />} onSave={saveExist} />
    </BrowserRouter>
  )
}

export const App = hot(module)(Main)
