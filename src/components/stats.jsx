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

export { Stats }