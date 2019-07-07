import React, { useState } from 'react'
import { Row, Col, Button } from 'antd'

import { LayoutList } from './LayoutList'
import { LayoutBuilder } from './LayoutBuilder'

export const BuilderPage = () => {
  const [layout, setLayout] = useState(null)

  return (
    <LayoutList/>
  )
}
