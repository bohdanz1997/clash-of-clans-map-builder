const Inventory = () => {
  const [entities, setEntities] = useState([])
  const [items, setItems] = useState({
    1: { id: 1, def: 'clanCastle', count: 2 },
    2: { id: 2, def: 'goldStorage', count: 2 },
  })
  const [selected, setSelected] = useState(1)

  const selectItem = (id) => {
    setSelected(id)
  }

  const addEntity = ({ x, y }) => {
    setItems({
      ...items,
      [selected]: {
        ...items[selected],
        count: items[selected].count - 1,
      },
    })

    const { def } = items[selected]
    setEntities(entities.concat([{ def, x, y }]))
  }

  return (
    <>
      {items.map(item => (
        <Item item={item} onClick={selectItem}/>
      ))}
      <Map onClick={addEntity}/>
    </>
  )
}
