import { useState } from "react"

const ids = Array.from({ length: 20 }, () => crypto.randomUUID())

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

const ListOfItems = ({ orderBy, items, onClickCheck, onClickDelete }) => {
  const sortedItems = orderBy === "stored"
    ? items.filter((item) => item.stored)
    : orderBy === "alphabetically"
      ? items.toSorted((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
      : items

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id}>
          <input type="checkbox" checked={item.stored} onChange={() => onClickCheck(item.id)} />
          <span className={item.stored ? "line-through" : ""}>{item.quantity} {item.name}</span>
          <button onClick={() => onClickDelete(item.id)}>❌</button>
        </li>
      ))}
    </ul>
  )
}

const Filters = ({ orderBy, onChangeOrder, onClickClearBtn }) => (
  <div className="actions">
    <select value={orderBy} onChange={onChangeOrder}>
      <option value="newest">Ordenar por mais recentes</option>
      <option value="stored">Mostrar guardados</option>
      <option value="alphabetically">Ordem alfabética</option>
    </select>
    <button onClick={onClickClearBtn}>Limpar lista</button>
  </div>
)

const Stats = ({ items }) => {
  const storedItems = items.reduce((acc, item) => item.stored ? acc + 1 : acc, 0)
  const storedPercentage = items.length === 0 ? 0 : ((storedItems / items.length) * 100).toFixed(0)
  const singularPlural = items.length === 1 ? "item" : "itens"

  return (
    <footer className="stats">
      <p>
        {`Você tem ${items.length} ${singularPlural} na lista`}
        {items.length > 0 && <span> e já guardou {storedItems} ({storedPercentage}%)</span>}
      </p>
    </footer>
  )
}

const Logo = () => (
  <header>
    <img className="img-logo" src="logo-espaco-mulher.png" alt="Logo Espaço Mulher" />
    <h1>Espaço Mulher</h1>
  </header>
)

const useItems = () => {
  const [items, setItems] = useState([])
  const [orderBy, setOrderBy] = useState("newest")

  const handleSubmit = (e) => {
    e.preventDefault()
    const { selectQtd, inputAdd } = e.target.elements

    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), quantity: +selectQtd.value, name: inputAdd.value, stored: false }
    ])
  }

  const handleChangeOrder = (e) => setOrderBy(e.target.value)
  const handleClickDelete = (id) => setItems((prev) => prev.filter((item) => item.id !== id))
  const handleClickClearBtn = () => setItems([])

  const handleClickCheck = (id) => setItems((prev) => prev
    .map((item) => item.id === id ? { ...item, stored: !item.stored } : item))

  return {
    items,
    orderBy,
    handleSubmit,
    handleChangeOrder,
    handleClickDelete,
    handleClickClearBtn,
    handleClickCheck
  }
}

const App = () => {
  const state = useItems()

  return (
    <div className="store-things">
      <Logo />
      <FormAddItem onHandleSubmit={state.handleSubmit} />
      <div className="list">
        <ListOfItems
          orderBy={state.orderBy}
          items={state.items}
          onClickCheck={state.handleClickCheck}
          onClickDelete={state.handleClickDelete}
        />
        <Filters
          orderBy={state.orderBy}
          onChangeOrder={state.handleChangeOrder}
          onClickClearBtn={state.handleClickClearBtn}
        />
      </div>
      <Stats items={state.items} />
    </div>
  )
}

export { App }