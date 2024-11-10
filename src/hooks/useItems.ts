import { useState } from 'react'
import { Item, ItemId } from '../App'

export const useItems = () => {
  const [items, setItems] = useState<Item[]>([])

  const addItems = (text: string) => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      text: text,
      timestamp: Date.now(),
    }

    setItems(prevItems => [...prevItems, newItem])
  }

  const removeItem = (id: ItemId) =>
    setItems(prevItems =>
      prevItems.filter(currentItem => currentItem?.id != id)
    )

  return {
    items,
    addItems,
    removeItem,
  }
}
