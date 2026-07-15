import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import { STORAGE_KEY } from './lib/constants'

afterEach(() => {
  localStorage.clear()
})

describe('App', () => {
  it('renders header and grid', () => {
    render(<App />)
    expect(screen.getByText('fupf glyph')).toBeInTheDocument()
    expect(screen.getByText('選択中のパターン')).toBeInTheDocument()
    expect(document.querySelectorAll('.cell').length).toBe(256)
  })

  it('selects a cell on click', () => {
    render(<App />)
    const cell = document.getElementById('cell-42')
    expect(cell).not.toBeNull()
    fireEvent.click(cell!)
    expect(document.querySelector('.cell.active')).toBe(cell)
    const infoDetail = document.getElementById('infoDetail')
    expect(infoDetail?.textContent).toContain('上0 右2 下2 左2')
  })

  it('switches mode', () => {
    render(<App />)
    const asterButton = screen.getByRole('button', { name: 'Aster' })
    fireEvent.click(asterButton)
    expect(asterButton).toHaveClass('active')
  })

  it('switches to pos16 mode', () => {
    render(<App />)
    const pos16Button = screen.getByRole('button', { name: '16² pos' })
    fireEvent.click(pos16Button)
    expect(pos16Button).toHaveClass('active')
  })

  it('toggles monochrome', () => {
    render(<App />)
    const checkbox = screen.getByLabelText('モノクロ')
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('changes notation style', () => {
    render(<App />)
    const radio = screen.getByLabelText('2進')
    fireEvent.click(radio)
    expect(radio).toBeChecked()
  })

  it('persists selected index to localStorage', () => {
    render(<App />)
    const cell = document.getElementById('cell-77')
    fireEvent.click(cell!)
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    expect(stored.selectedIndex).toBe(77)
  })
})
