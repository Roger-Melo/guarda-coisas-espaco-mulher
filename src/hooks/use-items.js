import localforage from "localforage"
import { useState, useEffect } from "react"

const useItems = () => {
  const [items, setItems] = useState([])
  const [orderBy, setOrderBy] = useState("newest")

  useEffect(() => {
    localforage.setItem("guardaCoisas", items)
      .catch((error) => alert(error.message))
  }, [items])

  useEffect(() => {
    localforage.getItem("guardaCoisas")
      .then((value) => {
        if (value) {
          setItems(value)
        }
      })
      .catch((error) => alert(error.message))
  }, [])

  const handleSubmitForm = (newItem) => setItems((prev) => [...prev, newItem])
  const handleChangeOrder = (e) => setOrderBy(e.target.value)
  const handleClickDelete = (id) => setItems((prev) => prev.filter((item) => item.id !== id))
  const handleClickClearBtn = () => setItems([])

  const handleClickCheck = (id) => setItems((prev) => prev
    .map((item) => item.id === id ? { ...item, stored: !item.stored } : item))

  return {
    items,
    orderBy,
    handleSubmitForm,
    handleChangeOrder,
    handleClickDelete,
    handleClickClearBtn,
    handleClickCheck
  }
}

export { useItems }
