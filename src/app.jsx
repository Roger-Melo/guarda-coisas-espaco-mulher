const ids = Array.from({ length: 20 }, () => crypto.randomUUID())

const App = () => (
  <>
    <form className="add-form">
      <h3>O que você precisa guardar?</h3>
      <select>
        {ids.map((id, index) => (
          <option key={id} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <input placeholder="Manda aqui" autoFocus />
      <button className="add-btn">Adicionar</button>
    </form>

    <div className="list">
      <ul>
        <li>
          <input type="checkbox" />
          <span>6 halteres 10kg</span>
          <button>❌</button>
        </li>
      </ul>
    </div>
  </>
)

export { App }
