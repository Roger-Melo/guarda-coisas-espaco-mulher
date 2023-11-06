import { useState } from "react"

const ids = Array.from({ length: 20 }, () => crypto.randomUUID())

const initialItems = [
  {
    id: crypto.randomUUID(),
    quantity: 6,
    name: "halteres 10kg",
    stored: false,
  },
  {
    id: crypto.randomUUID(),
    quantity: 4,
    name: "caneleiras 5kg",
    stored: false,
  },
  {
    id: crypto.randomUUID(),
    quantity: 16,
    name: "colchonetes",
    stored: false,
  },
]

const FormAddItem = ({ onHandleSubmit }) => (
  <form className="add-form" onSubmit={onHandleSubmit}>
    <h3>O que você precisa guardar?</h3>

    <select name="selectQtd">
      {ids.map((id, index) => (
        <option key={id} value={index + 1}>
          {index + 1}
        </option>
      ))}
    </select>

    <input name="inputAdd" placeholder="Manda aqui" autoFocus />
    <button className="add-btn">Adicionar</button>
  </form>
)

const ListOfItems = ({ sortedItems, onClickCheck, onClickDelete }) => (
  <ul>
    {sortedItems.map((item) => (
      <li key={item.id}>
        <input
          type="checkbox"
          checked={item.stored}
          onChange={() => onClickCheck(item.id)}
        />
        <span className={item.stored ? "line-through" : ""}>
          {item.quantity} {item.name}
        </span>
        <button onClick={() => onClickDelete(item.id)}>❌</button>
      </li>
    ))}
  </ul>
)

const App = () => {
  const [items, setItems] = useState(initialItems)
  const [orderBy, setOrderBy] = useState("newest")

  const handleSubmit = (e) => {
    e.preventDefault()
    const { selectQtd, inputAdd } = e.target.elements

    setItems((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        quantity: +selectQtd.value,
        name: inputAdd.value,
        stored: false,
      },
    ])
  }

  const handleClickDelete = (id) =>
    setItems((prev) => prev.filter((item) => item.id !== id))

  const handleClickCheck = (id) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stored: !item.stored } : item,
      ),
    )

  const handleChangeOrder = (e) => setOrderBy(e.target.value)

  const sortedItems = orderBy === "stored" ? items.filter((item) => item.stored) : items

  return (
    <>
      <FormAddItem onHandleSubmit={handleSubmit} />

      <div className="list">
        <ListOfItems
          sortedItems={sortedItems}
          onClickCheck={handleClickCheck}
          onClickDelete={handleClickDelete}
        />

        <div className="actions">
          <select value={orderBy} onChange={handleChangeOrder}>
            <option value="newest">Ordenar por mais recentes</option>
            <option value="stored">Mostrar guardados</option>
          </select>
        </div>
      </div>
    </>
  )
}

export { App }