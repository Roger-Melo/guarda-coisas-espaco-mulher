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

export { Filters }