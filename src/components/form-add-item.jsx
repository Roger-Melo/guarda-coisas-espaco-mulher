import { useState } from 'react'

const ids = Array.from({ length: 20 }, () => crypto.randomUUID())

const FormAddItem = ({ onSubmitItem }) => {
  const [inputValue, setInputValue] = useState('')
  const [selectValue, setSelectValue] = useState('1')

  const handleChangeInput = (e) => setInputValue(e.target.value)
  const handleChangeSelect = (e) => setSelectValue(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    onSubmitItem({
      id: crypto.randomUUID(),
      quantity: +selectValue,
      name: inputValue,
      stored: false
    })

    setInputValue('')
    setSelectValue('1')
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>O que você precisa guardar?</h3>

      <select value={selectValue} onChange={handleChangeSelect}>
        {ids.map((id, index) => <option key={id} value={index + 1}>{index + 1}</option>)}
      </select>

      <input value={inputValue} onChange={handleChangeInput} placeholder="Manda aqui" autoFocus />
      <button className="add-btn">Adicionar</button>
    </form>
  )
}

export { FormAddItem }