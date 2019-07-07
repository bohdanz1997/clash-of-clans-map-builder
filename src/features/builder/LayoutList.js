import React from 'react'
import { Col, Row, Button, Typography, Table } from 'antd'

export const LayoutList = ({ history, onRemove, layouts }) => {
  const createLayout = () => {
    history.push(`/layout`)
  }

  const view = (id) => {
    history.push(`/layout/${id}`)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Level',
      dataIndex: 'level',
    },
    {
      title: 'Actions',
      render(text) {
        return (
          <Button.Group>
            <Button onClick={() => view(text.id)}>View</Button>
            <Button onClick={() => onRemove(text.id)} type="danger">Remove</Button>
          </Button.Group>
        )
      }
    }
  ]

  return (
    <Row>
      <Col>
        <Typography.Title>All Layouts</Typography.Title>
        <Button onClick={createLayout}>Create</Button>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={layouts}
        />
      </Col>
    </Row>
  )
}
