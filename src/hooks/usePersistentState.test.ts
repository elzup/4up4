import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { usePersistentState } from './usePersistentState'
import { STORAGE_KEY } from '../lib/constants'

afterEach(() => {
  localStorage.clear()
})

describe('usePersistentState', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => usePersistentState())
    expect(result.current[0].currentMode).toBe('edges')
    expect(result.current[0].selectedIndex).toBe(0)
  })

  it('loads persisted state from localStorage', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ currentMode: 'aster', selectedIndex: 42 }),
    )
    const { result } = renderHook(() => usePersistentState())
    expect(result.current[0].currentMode).toBe('aster')
    expect(result.current[0].selectedIndex).toBe(42)
  })

  it('updates state and persists to localStorage', () => {
    const { result } = renderHook(() => usePersistentState())
    act(() => {
      result.current[1]({ selectedIndex: 100 })
    })
    expect(result.current[0].selectedIndex).toBe(100)
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    expect(stored.selectedIndex).toBe(100)
  })

  it('ignores corrupted localStorage data', () => {
    localStorage.setItem(STORAGE_KEY, 'not-json')
    const { result } = renderHook(() => usePersistentState())
    expect(result.current[0].currentMode).toBe('edges')
  })
})
