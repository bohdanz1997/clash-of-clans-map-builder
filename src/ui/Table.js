import React, { useState } from 'react'

const Head = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <td key={column.id}>
            {column.render ? column.render(column) : column.label}
          </td>
        ))}
      </tr>
    </thead>
  )
}

const Body = ({ data, columns }) => {
  return (
    <tbody>
      {data.map((item) => (
        <Row key={item.id} columns={columns} item={item} />
      ))}
    </tbody>
  )
}

const Row = ({ columns, item }) => {
  const tdKey = (column) => `${column.id}${item.id}`
  return (
    <tr>
      {columns.map((column) => (
        <td key={tdKey(column)}>{item[column.id]}</td>
      ))}
    </tr>
  )
}

export const Table = ({ columns, data, sortOpts }) => {
  const [sortOrder, setSortOrder] = useState(sortOpts.order)
  const [sortKey, setSortKey] = useState(sortOpts.key)

  const sortData = () =>
    data.sort((a, b) =>
      sortOrder === 'asc' ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey],
    )

  return (
    <table>
      <Head columns={columns} />
      <Body data={sortData()} columns={columns} />
    </table>
  )
}
