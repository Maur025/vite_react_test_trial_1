import './App.css'
import Item from './components/Item'
import { useItems } from './hooks/useItems'
import useSeo from './hooks/useSeo'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`

export interface Item {
  id: ItemId
  timestamp: number
  text: string
}

function App() {
  const { items, addItems, removeItem } = useItems()

  useSeo({
    title: `[${items?.length}] Prueba técnica de React`,
    description: 'Añadir y Eliminar elementos de una lista',
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const { elements } = event.currentTarget

    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) {
      return
    }

    addItems(input.value)

    input.value = ''
  }

  const createHandleRemoveItem = (id: ItemId) => removeItem(id)

  return (
    <main>
      <aside>
        <h1>Prueba técnica de React</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>

        <form onSubmit={handleSubmit} aria-label="Añadir elementos a la lista">
          <label htmlFor="itemInput">
            Elemento a introducir:{' '}
            <input
              id="itemInput"
              name="item"
              type="text"
              placeholder="VideoJuegos"
              required
            />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>

      <section>
        <h2>lista de elementos</h2>

        {items.length === 0 ? (
          <p>
            <strong>No hay elementos en lista</strong>
          </p>
        ) : (
          <ul>
            {items?.map(item => (
              <Item
                {...item}
                handleClick={() => createHandleRemoveItem(item?.id)}
                key={item.id}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
