import React, { useEffect, useRef } from 'react'
import { Row, Col, Button } from 'antd'

import { createGame } from '../../builder/src/game'
import { testLayout } from '../../builder/src/layout'

export const LayoutBuilder = ({ history, layouts, match, onSave }) => {
  const id = parseInt(match.params.id, 10)

  /** @type {{ current: Game }} */
  const gameRef = useRef()

  useEffect(() => {
    const layout = layouts.find(item => item.id === id)
    gameRef.current = createGame({
      layout: layout || testLayout,
    })

    return () => {
      gameRef.current.destroy()
    }
  }, [layouts, id])

  const goBack = () => {
    history.push('/')
  }

  const save = () => {
    gameRef.current.events.emit('save-layout')
    onSave(id)
  }

  return (
    <Row>
      <Col>
        <Button onClick={goBack}>Back</Button>
        <Button onClick={save}>Save</Button>
      </Col>
    </Row>
  )
}
