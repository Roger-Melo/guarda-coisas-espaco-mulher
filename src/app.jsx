import { useItems } from './hooks/use-items'
import { FormAddItem } from './components/form-add-item'
import { ListOfItems } from './components/list-of-items'
import { Filters } from './components/filters'
import { Stats } from './components/stats'
import { Logo } from './components/logo'

const App = () => {
  const state = useItems()

  return (
    <div className="store-things">
      <Logo />
      <FormAddItem onSubmitItem={state.handleSubmitForm} />
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
