import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from '../src/App'

describe('<App />', () => {
  // test('should work', () => {
  //   render(<App />)
  //   // screen.debug()
  // })

  // test('should add items and remove the item', async () => {
  //   const user = userEvent.setup()

  //   render(<App />)

  //   const input = screen.getByRole('textbox')
  //   expect(input).toBeDefined()

  //   const form = screen.getByRole('form')
  //   expect(form).toBeDefined()

  //   const button = form.querySelector('button')
  //   expect(button).toBeDefined()

  //   await user.type(input, 'mauro')
  //   await user.click(button!)

  //   await user.type(input, 'video')
  //   await user.click(button!)

  //   //El elemento se agrego?

  //   const list = screen.getByRole('list')
  //   expect(list).toBeDefined()

  //   expect(list.childNodes.length).toBe(2)

  //   //Eliminacion

  //   const itemMauro = screen.getByText('mauro')
  //   expect(itemMauro).toBeDefined()
  //   const removeButtonM = itemMauro.querySelector('button')
  //   expect(removeButtonM).toBeDefined()

  //   await user.click(removeButtonM!)

  //   expect(list.childNodes.length).toBe(1)

  //   const itemVideo = screen.getByText('video')
  //   expect(itemVideo).toBeDefined()
  //   const removeButtonV = itemVideo.querySelector('button')
  //   expect(removeButtonV).toBeDefined()

  //   await user.click(removeButtonV!)

  //   const noResults = screen.getByText('No hay elementos en lista')
  //   expect(noResults).toBeDefined()
  // })

  test('should add items and remove the item', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    const form = screen.getByRole('form')
    expect(form).toBeInTheDocument()

    const formButton = screen.getByRole('button')
    expect(formButton).toBeInTheDocument()

    await user.type(input, 'mauro')
    await user.click(formButton)

    await user.type(input, 'video')
    await user.click(formButton)

    // verificar que existen los items
    let items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
    // Eliminacion
    const itemMauro = screen.getByText('mauro')
    expect(itemMauro).toBeInTheDocument()
    const removeButtonMauro = itemMauro.querySelector('button')
    expect(removeButtonMauro).toBeInTheDocument()

    await user.click(removeButtonMauro!)

    await waitFor(() => {
      items = screen.getAllByRole('listitem')
      expect(items).toHaveLength(1)
    })

    const itemVideo = screen.getByText('video')
    expect(itemVideo).toBeInTheDocument()
    const removeButtonVideo = itemVideo.querySelector('button')
    expect(removeButtonVideo).toBeInTheDocument()

    await user.click(removeButtonVideo!)

    await waitFor(() => {
      items = screen.queryAllByRole('listitem')
      expect(items).toHaveLength(0)
    })

    const noResults = screen.getByText('No hay elementos en lista')
    expect(noResults).toBeInTheDocument()
  })
})
